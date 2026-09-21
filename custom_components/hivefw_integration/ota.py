"""Secure LAN OTA support for HiveFW ESP32 companions.

No OTA credential is stored in Home Assistant or committed to the repository.
Immediately before each upload Home Assistant generates a fresh 192-bit token,
pushes it to the radio through the already-established Companion connection,
and uses it exactly once for the HTTP OTA request. The firmware keeps the token
in RAM only and generates a different unknown token after reboot.
"""
from __future__ import annotations

import asyncio
import hashlib
import logging
import re
import secrets
import time
from collections.abc import Callable
from typing import Any

from aiohttp import BasicAuth, ClientConnectionError, ClientTimeout, web
from aiohttp.payload import Payload
from meshcore import EventType

from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import Unauthorized
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .const import DOMAIN
from .engine.const import CONF_CONNECTION_TYPE, CONF_TCP_HOST, CONNECTION_TYPE_TCP

_LOGGER = logging.getLogger(__name__)

GITHUB_REPO = "fabiocguerreiro/HiveFW-Companion-Repeater"
GITHUB_RELEASE_API = f"https://api.github.com/repos/{GITHUB_REPO}/releases/latest"
OTA_USERNAME = "hivefw"
OTA_MAX_FIRMWARE_BYTES = 4 * 1024 * 1024
OTA_MIN_FIRMWARE_BYTES = 64 * 1024
OTA_TARGET_PREFIX = "Heltec_v3_companion_radio_wifi-"
RELEASE_CACHE_SECONDS = 60 * 60
RELEASE_EMPTY_CACHE_SECONDS = 30
_OTA_HTTP_REGISTERED = False


class HiveFWOtaError(RuntimeError):
    """Raised when secure HiveFW OTA cannot be completed."""


def _ota_progress_state(hass: HomeAssistant) -> dict[str, dict[str, Any]]:
    """Return the per-entry in-memory OTA progress registry."""
    return hass.data.setdefault(DOMAIN, {}).setdefault("_ota_progress", {})


def _set_ota_progress(
    hass: HomeAssistant,
    entry_id: str,
    *,
    stage: str,
    percent: int,
    detail: str = "",
    error: str | None = None,
) -> None:
    """Publish OTA progress without touching the radio or persistent storage."""
    _ota_progress_state(hass)[entry_id] = {
        "stage": stage,
        "percent": max(0, min(100, int(percent))),
        "detail": detail,
        "error": error,
        "updated_at": time.time(),
    }


def get_ota_progress(hass: HomeAssistant, entry_id: str | None) -> dict[str, Any]:
    """Return local OTA progress for one entry, never querying the radio."""
    if not entry_id:
        return {
            "stage": "idle",
            "percent": 0,
            "detail": "",
            "error": None,
            "updated_at": None,
        }
    state = _ota_progress_state(hass).get(entry_id)
    if not isinstance(state, dict):
        return {
            "stage": "idle",
            "percent": 0,
            "detail": "",
            "error": None,
            "updated_at": None,
        }
    return dict(state)


class _MultipartFirmwarePayload(Payload):
    """Fixed-length multipart payload matching AsyncElegantOTA's own uploader."""

    def __init__(
        self,
        firmware: bytes,
        md5: str,
        progress: Callable[[int], None] | None = None,
    ) -> None:
        self._firmware = firmware
        self._progress = progress
        boundary = f"----HiveFWOTA{secrets.token_hex(12)}"
        self._prefix = (
            f"--{boundary}\r\n"
            'Content-Disposition: form-data; name="MD5"\r\n'
            "\r\n"
            f"{md5}\r\n"
            f"--{boundary}\r\n"
            'Content-Disposition: form-data; name="firmware"; filename="firmware"\r\n'
            "Content-Type: application/octet-stream\r\n"
            "\r\n"
        ).encode("utf-8")
        self._suffix = f"\r\n--{boundary}--\r\n".encode("utf-8")

        super().__init__(
            firmware,
            content_type=f"multipart/form-data; boundary={boundary}",
        )
        self._size = len(self._prefix) + len(firmware) + len(self._suffix)

    async def write(self, writer) -> None:
        await writer.write(self._prefix)

        total = len(self._firmware)
        sent = 0
        chunk_size = 16 * 1024
        for offset in range(0, total, chunk_size):
            chunk = self._firmware[offset : offset + chunk_size]
            await writer.write(chunk)
            sent += len(chunk)
            if self._progress:
                self._progress(round(sent * 100 / total))

        await writer.write(self._suffix)


class _OtaSecretFilter(logging.Filter):
    """Drop any log record containing the ephemeral OTA credential.

    meshcore_py currently logs both set_custom_var values and raw command
    frames at DEBUG level. The latter contains the ASCII token encoded as hex.
    This short-lived filter therefore checks both representations.
    """

    def __init__(self, secret: str) -> None:
        super().__init__()
        self._plain = secret
        self._wire_hex = secret.encode("utf-8").hex()

    def filter(self, record: logging.LogRecord) -> bool:
        try:
            message = record.getMessage()
        except Exception:
            return True
        return self._plain not in message and self._wire_hex not in message


def _get_coordinator(hass: HomeAssistant, entry_id: str | None):
    bucket = hass.data.get(DOMAIN, {})
    if entry_id:
        candidate = bucket.get(entry_id)
        if candidate is not None and hasattr(candidate, "api"):
            return candidate

    for key, candidate in bucket.items():
        if str(key).startswith("_"):
            continue
        if hasattr(candidate, "api") and hasattr(candidate, "config_entry"):
            return candidate
    return None


def _result_error(result: Any) -> str | None:
    if result is None:
        return "no response from radio"
    if getattr(result, "type", None) == EventType.ERROR:
        payload = getattr(result, "payload", {}) or {}
        if isinstance(payload, dict):
            return str(
                payload.get("code_string")
                or payload.get("reason")
                or payload.get("message")
                or payload
            )
        return str(payload or "radio rejected command")
    return None


def _version_tuple(value: str | None) -> tuple[int, ...]:
    if not value:
        return ()
    match = re.search(r"(?i)v?(\d+(?:\.\d+){1,2})", str(value))
    if not match:
        return ()
    try:
        return tuple(int(part) for part in match.group(1).split("."))
    except ValueError:
        return ()


def secure_ota_capable(firmware_version: str | None) -> bool:
    """Return whether the advertised firmware includes write-only ota_token."""
    version = _version_tuple(firmware_version)
    return bool(version) and version >= (1, 11)


def _validate_firmware(firmware: bytes, filename: str) -> None:
    if not filename.lower().endswith(".bin"):
        raise HiveFWOtaError("Only ESP32 .bin firmware images are accepted")
    if "merged" in filename.lower():
        raise HiveFWOtaError(
            "Merged factory images cannot be used for OTA; select firmware.bin"
        )
    if len(firmware) < OTA_MIN_FIRMWARE_BYTES:
        raise HiveFWOtaError("Firmware image is unexpectedly small")
    if len(firmware) > OTA_MAX_FIRMWARE_BYTES:
        raise HiveFWOtaError("Firmware image exceeds the 4 MiB safety limit")
    if not firmware or firmware[0] != 0xE9:
        raise HiveFWOtaError("File does not look like an ESP32 application image")


async def _rotate_ota_token(coordinator) -> str:
    """Rotate the radio's write-only OTA token and return it in-memory only."""
    token = secrets.token_hex(24)  # 192 bits, 48 hex chars

    # meshcore_py logs custom-var values and the raw command frame at DEBUG.
    # Never let the ephemeral credential reach Home Assistant logs, even when
    # a user has enabled verbose meshcore logging for diagnostics.
    secret_filter = _OtaSecretFilter(token)
    loggers = {
        logging.getLogger("meshcore"),
        logging.getLogger(),
    }
    handlers: list[logging.Handler] = []
    for logger in loggers:
        for handler in logger.handlers:
            if handler not in handlers:
                handlers.append(handler)
                handler.addFilter(secret_filter)

    mesh_logger = logging.getLogger("meshcore")
    mesh_logger.addFilter(secret_filter)
    try:
        result = await coordinator.api.mesh_core.commands.set_custom_var(
            "ota_token",
            token,
        )
    finally:
        mesh_logger.removeFilter(secret_filter)
        for handler in handlers:
            handler.removeFilter(secret_filter)

    reason = _result_error(result)
    if reason is not None:
        # Never include the token in an exception/log message.
        raise HiveFWOtaError(
            "This firmware does not support secure Home Assistant OTA yet "
            f"({reason}). Install HiveFW V1.11 once through the existing /update page."
        )
    return token


async def async_create_manual_ota_session(
    hass: HomeAssistant,
    coordinator,
) -> dict[str, Any]:
    """Create one ephemeral browser-login session for the radio Web OTA page.

    The credential is generated in Home Assistant memory, pushed to the radio
    through the existing authenticated Companion connection, returned once to
    the requesting HA admin, and never persisted by the integration. It remains
    valid only until the radio reboots or another OTA token is rotated.
    """
    entry = coordinator.config_entry
    if entry.data.get(CONF_CONNECTION_TYPE) != CONNECTION_TYPE_TCP:
        raise HiveFWOtaError("Manual Web OTA requires the HiveFW TCP/Wi-Fi connection")

    host = str(entry.data.get(CONF_TCP_HOST, "")).strip()
    if not host:
        raise HiveFWOtaError("No TCP host is configured for this HiveFW device")

    token = await _rotate_ota_token(coordinator)
    return {
        "success": True,
        "host": host,
        "url": f"http://{host}/update",
        "username": OTA_USERNAME,
        "password": token,
        "expires": "radio_reboot_or_next_token_rotation",
    }


async def _wait_for_web_ota_return(
    hass: HomeAssistant,
    host: str,
) -> bool:
    """Confirm that the ESP came back after an OTA-side connection drop."""
    await asyncio.sleep(3)
    session = async_get_clientsession(hass)
    for _ in range(10):
        try:
            async with session.get(
                f"http://{host}/",
                timeout=ClientTimeout(total=3),
            ) as response:
                if response.status == 200:
                    return True
        except (ClientConnectionError, asyncio.TimeoutError):
            pass
        except Exception:
            pass
        await asyncio.sleep(2)
    return False


def _apply_live_device_info(coordinator, payload: dict[str, Any]) -> str | None:
    """Apply a freshly queried DEVICE_INFO payload to coordinator state."""
    version = str(payload.get("ver") or "").strip() or None
    model = str(payload.get("model") or "").strip() or None

    if version is not None:
        coordinator._firmware_version = version
        if hasattr(coordinator, "device_info"):
            coordinator.device_info["sw_version"] = version

    if model is not None:
        coordinator._hardware_model = model
        if hasattr(coordinator, "device_info"):
            coordinator.device_info["model"] = model

    max_channels = payload.get("max_channels")
    if max_channels is not None:
        try:
            coordinator._max_channels = int(max_channels)
        except (TypeError, ValueError):
            pass

    if hasattr(coordinator, "_device_info_initialized"):
        coordinator._device_info_initialized = True

    try:
        coordinator.async_update_listeners()
    except Exception:
        pass

    return version


async def _read_live_firmware_version(coordinator) -> str | None:
    """Read DEVICE_INFO directly from the radio and refresh cached metadata."""
    mesh_core = getattr(coordinator.api, "mesh_core", None)
    if mesh_core is None:
        return None

    result = await mesh_core.commands.send_device_query()
    if result is None or getattr(result, "type", None) != EventType.DEVICE_INFO:
        return None

    payload = getattr(result, "payload", None)
    if not isinstance(payload, dict):
        return None

    return _apply_live_device_info(coordinator, payload)


async def _refresh_after_reboot(
    hass: HomeAssistant,
    coordinator,
    expected_version: str | None = None,
) -> str | None:
    """Wait for the radio to return and verify the firmware it actually booted."""
    await asyncio.sleep(5)

    if hasattr(coordinator, "_device_info_initialized"):
        coordinator._device_info_initialized = False

    last_version: str | None = None

    for _ in range(15):
        try:
            # First let the coordinator repair/reconnect its transport if the
            # OTA reboot invalidated the existing TCP session.
            await coordinator.async_request_refresh()
        except Exception:
            pass

        try:
            last_version = await _read_live_firmware_version(coordinator)
        except Exception:
            last_version = None

        if last_version:
            if expected_version:
                expected_tuple = _version_tuple(expected_version)
                actual_tuple = _version_tuple(last_version)
                if expected_tuple and actual_tuple and actual_tuple < expected_tuple:
                    # The radio is online, but it booted the old application.
                    # Keep trying briefly in case the TCP stack reconnected
                    # during the reboot transition.
                    await asyncio.sleep(3)
                    continue
            return last_version

        await asyncio.sleep(3)

    if expected_version and last_version:
        raise HiveFWOtaError(
            "OTA upload finished, but the radio rebooted with "
            f"{last_version} instead of {expected_version}. "
            "The firmware was not activated."
        )

    raise HiveFWOtaError(
        "OTA upload finished, but the radio did not return a fresh DEVICE_INFO "
        "response after reboot."
    )


async def async_upload_firmware_bytes(
    hass: HomeAssistant,
    coordinator,
    firmware: bytes,
    filename: str,
    progress: Callable[[int], None] | None = None,
    expected_version: str | None = None,
) -> dict[str, Any]:
    """Upload one ESP32 app image using AsyncElegantOTA-compatible multipart."""
    entry = coordinator.config_entry
    if entry.data.get(CONF_CONNECTION_TYPE) != CONNECTION_TYPE_TCP:
        raise HiveFWOtaError("Web OTA requires the HiveFW TCP/Wi-Fi connection")

    host = str(entry.data.get(CONF_TCP_HOST, "")).strip()
    if not host:
        raise HiveFWOtaError("No TCP host is configured for this HiveFW device")

    entry_id = str(entry.entry_id)
    _validate_firmware(firmware, filename)

    def publish(stage: str, percent: int, detail: str = "") -> None:
        _set_ota_progress(
            hass,
            entry_id,
            stage=stage,
            percent=percent,
            detail=detail,
        )
        if progress:
            progress(percent)

    publish("preparing", 3, "A validar a imagem de firmware")

    token = ""
    try:
        publish("authenticating", 7, "A gerar credencial OTA efémera")
        token = await _rotate_ota_token(coordinator)

        md5 = hashlib.md5(firmware, usedforsecurity=False).hexdigest()

        def upload_progress(pct: int) -> None:
            overall = 10 + round(max(0, min(100, pct)) * 0.78)
            publish(
                "uploading",
                overall,
                f"A enviar firmware para o rádio · {pct}%",
            )

        payload = _MultipartFirmwarePayload(
            firmware,
            md5,
            progress=upload_progress,
        )

        url = f"http://{host}/update"
        session = async_get_clientsession(hass)
        response_lost_during_reboot = False

        publish("uploading", 10, "A iniciar upload para o rádio · 0%")

        try:
            async with session.post(
                url,
                data=payload,
                auth=BasicAuth(OTA_USERNAME, token),
                headers={
                    "Accept": "text/plain",
                    "Connection": "close",
                },
                timeout=ClientTimeout(
                    total=90,
                    sock_connect=8,
                    sock_read=20,
                ),
            ) as response:
                body = (await response.text()).strip()
                if response.status != 200 or body != "OK":
                    raise HiveFWOtaError(
                        f"Radio rejected OTA upload (HTTP {response.status}: "
                        f"{body or 'empty response'})"
                    )
        except (ClientConnectionError, asyncio.TimeoutError) as ex:
            if await _wait_for_web_ota_return(hass, host):
                response_lost_during_reboot = True
            else:
                raise HiveFWOtaError(
                    "Radio disconnected during OTA and did not return online"
                ) from ex

        publish("rebooting", 90, "Firmware aceite · rádio a reiniciar")
        publish("verifying", 94, "A aguardar reconexão e confirmar a versão")

        installed_version = await _refresh_after_reboot(
            hass,
            coordinator,
            expected_version=expected_version,
        )

        publish("complete", 100, f"Firmware ativo: {installed_version or 'confirmado'}")

        return {
            "success": True,
            "host": host,
            "size": len(firmware),
            "md5": md5,
            "rebooting": False,
            "installed_version": installed_version,
            "response_lost_during_reboot": response_lost_during_reboot,
        }
    except Exception as ex:
        current = get_ota_progress(hass, entry_id)
        _set_ota_progress(
            hass,
            entry_id,
            stage="error",
            percent=int(current.get("percent", 0) or 0),
            detail="Falha no processo OTA",
            error=str(ex),
        )
        raise
    finally:
        token = ""


async def async_get_latest_release(
    hass: HomeAssistant,
    *,
    force: bool = False,
) -> dict[str, Any] | None:
    """Return cached metadata for the latest public HiveFW V3 release."""
    bucket = hass.data.setdefault(DOMAIN, {})
    now = time.monotonic()
    cached = bucket.get("_ota_release_cache")
    if not force and isinstance(cached, dict):
        cached_release = cached.get("release")
        cache_ttl = (
            RELEASE_CACHE_SECONDS
            if cached_release
            else RELEASE_EMPTY_CACHE_SECONDS
        )
        if now - float(cached.get("timestamp", 0)) < cache_ttl:
            return cached_release

    session = async_get_clientsession(hass)
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "HiveFW-Home-Assistant",
    }
    try:
        async with session.get(
            GITHUB_RELEASE_API,
            headers=headers,
            timeout=ClientTimeout(total=20),
        ) as response:
            if response.status == 404:
                release = None
            elif response.status != 200:
                raise HiveFWOtaError(
                    f"GitHub release check failed with HTTP {response.status}"
                )
            else:
                payload = await response.json()
                assets = payload.get("assets", []) if isinstance(payload, dict) else []
                firmware_asset = next(
                    (
                        asset
                        for asset in assets
                        if str(asset.get("name", "")).startswith(OTA_TARGET_PREFIX)
                        and str(asset.get("name", "")).endswith(".bin")
                        and "-merged" not in str(asset.get("name", "")).lower()
                    ),
                    None,
                )
                checksum_asset = None
                if firmware_asset:
                    wanted = f"{firmware_asset.get('name')}.sha256"
                    checksum_asset = next(
                        (a for a in assets if a.get("name") == wanted),
                        None,
                    )

                if not firmware_asset:
                    release = None
                else:
                    tag = str(payload.get("tag_name", ""))
                    version = tag
                    if version.lower().startswith("hivefw-"):
                        version = version[7:]
                    release = {
                        "version": version,
                        "tag": tag,
                        "name": payload.get("name") or tag,
                        "url": payload.get("html_url"),
                        "body": payload.get("body") or "",
                        "asset_name": firmware_asset.get("name"),
                        "asset_url": firmware_asset.get("browser_download_url"),
                        "asset_size": firmware_asset.get("size"),
                        "checksum_url": (
                            checksum_asset.get("browser_download_url")
                            if checksum_asset
                            else None
                        ),
                    }
    except HiveFWOtaError:
        raise
    except Exception as ex:
        raise HiveFWOtaError(f"Unable to check HiveFW releases: {ex}") from ex

    bucket["_ota_release_cache"] = {"timestamp": now, "release": release}
    return release


async def _download_release_asset(
    hass: HomeAssistant,
    release: dict[str, Any],
    progress: Callable[[int], None] | None = None,
) -> tuple[bytes, str]:
    url = str(release.get("asset_url") or "")
    filename = str(release.get("asset_name") or "firmware.bin")
    if not url:
        raise HiveFWOtaError("Latest release has no OTA firmware asset")

    session = async_get_clientsession(hass)
    if progress:
        progress(5)
    async with session.get(url, timeout=ClientTimeout(total=120)) as response:
        if response.status != 200:
            raise HiveFWOtaError(
                f"Firmware download failed with HTTP {response.status}"
            )
        firmware = await response.read()

    _validate_firmware(firmware, filename)

    checksum_url = release.get("checksum_url")
    if checksum_url:
        async with session.get(
            str(checksum_url),
            timeout=ClientTimeout(total=20),
        ) as response:
            if response.status != 200:
                raise HiveFWOtaError("Could not download firmware checksum")
            checksum_text = (await response.text()).strip()
        expected = checksum_text.split()[0].lower() if checksum_text else ""
        actual = hashlib.sha256(firmware).hexdigest()
        if not expected or not secrets.compare_digest(expected, actual):
            raise HiveFWOtaError("Firmware SHA-256 verification failed")

    if progress:
        progress(20)
    return firmware, filename


async def async_install_latest_release(
    hass: HomeAssistant,
    coordinator,
    progress: Callable[[int], None] | None = None,
) -> dict[str, Any]:
    release = await async_get_latest_release(hass, force=True)
    if not release:
        raise HiveFWOtaError("No public HiveFW V3 OTA release is available")
    firmware, filename = await _download_release_asset(hass, release, progress)
    result = await async_upload_firmware_bytes(
        hass,
        coordinator,
        firmware,
        filename,
        (
            (lambda pct: progress(min(100, 20 + round(pct * 0.8))))
            if progress
            else None
        ),
        expected_version=str(release.get("version") or "") or None,
    )
    result["version"] = release.get("version")
    return result


async def async_detect_secure_ota(
    coordinator,
    firmware_version: str | None = None,
) -> bool:
    """Detect secure OTA capability from the radio, not just version text.

    DEVICE_INFO firmware strings are not guaranteed to preserve a simple
    semantic-version format. If the version string does not prove V1.11+,
    probe the write-only ota_token capability directly. A successful probe
    simply rotates the in-RAM credential; a later upload rotates it again.
    """
    if secure_ota_capable(firmware_version):
        return True

    try:
        await _rotate_ota_token(coordinator)
        return True
    except HiveFWOtaError:
        return False


async def async_get_ota_status(
    hass: HomeAssistant,
    entry_id: str | None,
    *,
    force_release: bool = False,
) -> dict[str, Any]:
    coordinator = _get_coordinator(hass, entry_id)
    if coordinator is None:
        raise HiveFWOtaError("No HiveFW coordinator found")

    entry = coordinator.config_entry

    # Firmware status must reflect the radio that is online now, not whatever
    # DEVICE_INFO happened to be cached before an OTA reboot.
    try:
        live_firmware = await _read_live_firmware_version(coordinator)
    except Exception:
        live_firmware = None

    firmware = str(
        live_firmware
        or getattr(coordinator, "_firmware_version", "")
        or ""
    )
    connection_type = entry.data.get(CONF_CONNECTION_TYPE)
    host = str(entry.data.get(CONF_TCP_HOST, "") or "")
    supported = connection_type == CONNECTION_TYPE_TCP and bool(host)
    secure_ota = (
        await async_detect_secure_ota(coordinator, firmware)
        if supported
        else False
    )

    release = None
    try:
        release = await async_get_latest_release(hass, force=force_release)
    except HiveFWOtaError:
        # Release discovery failure must not hide local OTA state.
        pass

    latest_version = str(release.get("version") or "") if release else ""
    installed_tuple = _version_tuple(firmware)
    latest_tuple = _version_tuple(latest_version)
    if release and latest_tuple and installed_tuple:
        update_available = latest_tuple > installed_tuple
    elif release and latest_version and firmware:
        update_available = latest_version != firmware
    else:
        update_available = False

    return {
        "supported": supported,
        "secure_ota": secure_ota,
        "bootstrap_required": supported and not secure_ota,
        "host": host,
        "installed_version": firmware or None,
        "latest_version": latest_version or None,
        "release_url": release.get("url") if release else None,
        "release_name": release.get("name") if release else None,
        "release_available": bool(release),
        "update_available": update_available,
    }


class HiveFWFirmwareUploadView(HomeAssistantView):
    """Admin-only multipart endpoint for manual .bin upload from the panel."""

    url = "/api/hivefw_integration/firmware"
    name = "api:hivefw_integration:firmware"
    requires_auth = True

    async def post(self, request):
        hass: HomeAssistant = request.app["hass"]
        user = request.get("hass_user")
        if user is None or not user.is_admin:
            raise Unauthorized()

        if not request.content_type.startswith("multipart/"):
            return web.json_response(
                {"success": False, "error": "multipart/form-data required"},
                status=400,
            )

        entry_id = ""
        firmware: bytes | None = None
        filename = ""

        try:
            reader = await request.multipart()
            while True:
                field = await reader.next()
                if field is None:
                    break
                if field.name == "entry_id":
                    entry_id = (await field.text()).strip()
                elif field.name == "firmware":
                    filename = str(field.filename or "firmware.bin")
                    data = bytearray()
                    while True:
                        chunk = await field.read_chunk(size=64 * 1024)
                        if not chunk:
                            break
                        data.extend(chunk)
                        if len(data) > OTA_MAX_FIRMWARE_BYTES:
                            raise HiveFWOtaError(
                                "Firmware image exceeds the 4 MiB safety limit"
                            )
                    firmware = bytes(data)

            if not entry_id:
                raise HiveFWOtaError("Missing HiveFW entry_id")
            if firmware is None:
                raise HiveFWOtaError("Missing firmware file")

            coordinator = _get_coordinator(hass, entry_id)
            if coordinator is None:
                raise HiveFWOtaError("HiveFW coordinator not found")

            result = await async_upload_firmware_bytes(
                hass,
                coordinator,
                firmware,
                filename,
            )
            return web.json_response(result)
        except HiveFWOtaError as ex:
            return web.json_response(
                {"success": False, "error": str(ex)},
                status=400,
            )
        except Exception as ex:
            _LOGGER.exception("Unexpected HiveFW OTA upload failure")
            return web.json_response(
                {"success": False, "error": "Unexpected OTA upload failure"},
                status=500,
            )


def async_register_ota_http(hass: HomeAssistant) -> None:
    """Register the admin-only firmware upload endpoint once per HA process."""
    global _OTA_HTTP_REGISTERED
    if _OTA_HTTP_REGISTERED:
        return
    hass.http.register_view(HiveFWFirmwareUploadView)
    _OTA_HTTP_REGISTERED = True
