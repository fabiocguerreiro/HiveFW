"""Firmware update entity for HiveFW ESP32 Companion-Repeater."""
from __future__ import annotations

import logging
import re
from datetime import timedelta
from typing import Any

from homeassistant.components.update import (
    UpdateDeviceClass,
    UpdateEntity,
    UpdateEntityFeature,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

from .const import DOMAIN
from .ota import (
    HiveFWOtaError,
    async_detect_secure_ota,
    async_get_latest_release,
    async_install_latest_release,
)

_LOGGER = logging.getLogger(__name__)
SCAN_INTERVAL = timedelta(hours=6)


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


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up the HiveFW firmware update entity."""
    coordinator = hass.data[DOMAIN][entry.entry_id]
    async_add_entities([HiveFWFirmwareUpdateEntity(coordinator)], update_before_add=True)


class HiveFWFirmwareUpdateEntity(UpdateEntity):
    """Native Home Assistant firmware update surface for HiveFW."""

    _attr_has_entity_name = True
    _attr_name = "Firmware"
    _attr_title = "HiveFW Companion-Repeater"
    _attr_device_class = UpdateDeviceClass.FIRMWARE
    _attr_supported_features = (
        UpdateEntityFeature.INSTALL
        | UpdateEntityFeature.PROGRESS
        | UpdateEntityFeature.RELEASE_NOTES
    )
    _attr_display_precision = 0

    def __init__(self, coordinator) -> None:
        self.coordinator = coordinator
        self._attr_unique_id = f"{coordinator.config_entry.entry_id}_firmware_update"
        self._release: dict[str, Any] | None = None
        self._secure_ota = False
        self._installing = False
        self._progress: int | None = None

    @property
    def device_info(self):
        return self.coordinator.device_info

    @property
    def installed_version(self) -> str | None:
        return str(getattr(self.coordinator, "_firmware_version", "") or "") or None

    @property
    def latest_version(self) -> str | None:
        if not self._release:
            return None
        return str(self._release.get("version") or "") or None

    @property
    def release_url(self) -> str | None:
        if not self._release:
            return None
        return self._release.get("url")

    @property
    def release_summary(self) -> str | None:
        if not self._release:
            return None
        body = str(self._release.get("body") or "").strip()
        if not body:
            return None
        return body[:255]

    @property
    def in_progress(self) -> bool:
        return self._installing

    @property
    def update_percentage(self) -> int | None:
        return self._progress if self._installing else None

    @property
    def available(self) -> bool:
        return self._secure_ota

    def version_is_newer(self, latest_version: str, installed_version: str) -> bool:
        latest = _version_tuple(latest_version)
        installed = _version_tuple(installed_version)
        if latest and installed:
            width = max(len(latest), len(installed))
            return latest + (0,) * (width - len(latest)) > installed + (0,) * (
                width - len(installed)
            )
        return latest_version != installed_version

    async def async_update(self) -> None:
        self._secure_ota = await async_detect_secure_ota(
            self.coordinator,
            self.installed_version,
        )
        try:
            self._release = await async_get_latest_release(self.hass)
        except HiveFWOtaError as ex:
            _LOGGER.debug("HiveFW release discovery unavailable: %s", ex)
            self._release = None

    async def async_release_notes(self) -> str | None:
        if not self._release:
            return None
        return str(self._release.get("body") or "") or None

    async def async_install(
        self,
        version: str | None,
        backup: bool,
        **kwargs: Any,
    ) -> None:
        if self._installing:
            raise HomeAssistantError("HiveFW firmware update is already in progress")
        self._secure_ota = await async_detect_secure_ota(
            self.coordinator,
            self.installed_version,
        )
        if not self._secure_ota:
            raise HomeAssistantError(
                "The connected radio does not expose secure HiveFW OTA."
            )

        self._installing = True
        self._progress = 0
        self.async_write_ha_state()

        def on_progress(value: int) -> None:
            self._progress = max(0, min(100, int(value)))
            self.async_write_ha_state()

        try:
            await async_install_latest_release(
                self.hass,
                self.coordinator,
                on_progress,
            )
        except HiveFWOtaError as ex:
            raise HomeAssistantError(str(ex)) from ex
        finally:
            self._installing = False
            self._progress = None
            try:
                self._release = await async_get_latest_release(
                    self.hass,
                    force=True,
                )
            except HiveFWOtaError:
                pass
            self.async_write_ha_state()
