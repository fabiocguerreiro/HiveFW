import { Dfu } from './usb-flasher/vendor/dfu.js';
import { ESPLoader, Transport, HardReset } from './usb-flasher/vendor/esp32.js';

export type UsbFlashHardware = 'heltec-v3' | 'heltec-t114';
export type UsbFlashVariant = 'ble' | 'wifi';
export type UsbFlashSource = 'latest' | 'manual';

export interface UsbFlashOptions {
  hardware: UsbFlashHardware;
  variant: UsbFlashVariant;
  erase: boolean;
  source: UsbFlashSource;
  file?: File | null;
  onProgress?: (percent: number, stage: string) => void;
  onLog?: (line: string) => void;
}

interface GithubAsset {
  name: string;
  browser_download_url: string;
  size?: number;
}

interface GithubRelease {
  tag_name: string;
  name?: string;
  assets: GithubAsset[];
}

const RELEASE_API = 'https://api.github.com/repos/fabiocguerreiro/HiveFW/releases/latest';
const T114_ERASER = 'FLASH_ERASE_nrf52_softdevice_v6.zip';

function serialApi(): {
  requestPort(options?: Record<string, unknown>): Promise<unknown>;
} {
  const serial = (navigator as Navigator & { serial?: {
    requestPort(options?: Record<string, unknown>): Promise<unknown>;
  } }).serial;
  if (!serial) {
    throw new Error('Web Serial não está disponível neste browser. Usa Chrome/Edge por HTTPS.');
  }
  return serial;
}

export function usbFlasherSupported(): boolean {
  return Boolean((navigator as Navigator & { serial?: unknown }).serial);
}

function report(options: UsbFlashOptions, percent: number, stage: string) {
  options.onProgress?.(Math.max(0, Math.min(100, percent)), stage);
}

function log(options: UsbFlashOptions, line: string) {
  options.onLog?.(line);
}

async function fetchLatestRelease(): Promise<GithubRelease> {
  const response = await fetch(RELEASE_API, {
    headers: { Accept: 'application/vnd.github+json' },
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`Não foi possível consultar a última release HiveFW (HTTP ${response.status}).`);
  }
  return response.json() as Promise<GithubRelease>;
}

function findAsset(
  release: GithubRelease,
  hardware: UsbFlashHardware,
  variant: UsbFlashVariant,
  erase: boolean,
): GithubAsset {
  const assets = release.assets || [];

  if (hardware === 'heltec-t114') {
    if (variant !== 'ble') {
      throw new Error('O Heltec T114 não possui variante Wi-Fi. Seleciona BLE.');
    }
    const asset = assets.find((item) =>
      /^Heltec_t114_companion_radio_ble-.*\.zip$/i.test(item.name),
    );
    if (!asset) throw new Error('A última release não contém o ZIP DFU do Heltec T114 BLE.');
    return asset;
  }

  const prefix = variant === 'wifi'
    ? 'Heltec_v3_companion_radio_wifi-'
    : 'Heltec_v3_companion_radio_ble-';

  const candidates = assets.filter((item) =>
    item.name.startsWith(prefix) && item.name.toLowerCase().endsWith('.bin'),
  );

  const asset = erase
    ? candidates.find((item) => item.name.toLowerCase().endsWith('-merged.bin'))
    : candidates.find((item) => !item.name.toLowerCase().endsWith('-merged.bin'));

  if (!asset) {
    throw new Error(
      erase
        ? `A última release não contém a imagem merged para ${variant.toUpperCase()} do Heltec V3.`
        : `A última release não contém a imagem de aplicação para ${variant.toUpperCase()} do Heltec V3.`,
    );
  }
  return asset;
}

async function downloadBlob(asset: GithubAsset): Promise<Blob> {
  const response = await fetch(asset.browser_download_url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Falha ao descarregar ${asset.name} (HTTP ${response.status}).`);
  }
  return response.blob();
}

async function latestFirmware(
  options: UsbFlashOptions,
): Promise<{ blob: Blob; name: string; release: GithubRelease }> {
  report(options, 2, 'A consultar a última release…');
  const release = await fetchLatestRelease();
  const asset = findAsset(release, options.hardware, options.variant, options.erase);
  log(options, `Release: ${release.tag_name} · ${asset.name}`);
  report(options, 6, 'A descarregar firmware…');
  const blob = await downloadBlob(asset);
  return { blob, name: asset.name, release };
}

function validateManualFile(options: UsbFlashOptions): File {
  const file = options.file;
  if (!file) throw new Error('Seleciona primeiro um ficheiro de firmware.');

  const lower = file.name.toLowerCase();
  if (options.hardware === 'heltec-v3') {
    if (!lower.endsWith('.bin')) {
      throw new Error('Para o Heltec V3 seleciona um ficheiro .bin.');
    }
    if (options.erase && !lower.endsWith('-merged.bin')) {
      throw new Error(
        'Com “Apagar flash” ativo, o V3 necessita de um *-merged.bin que inclua bootloader, partições e aplicação.',
      );
    }
  } else {
    if (options.variant !== 'ble') {
      throw new Error('O Heltec T114 não possui variante Wi-Fi. Seleciona BLE.');
    }
    if (!lower.endsWith('.zip')) {
      throw new Error('Para o Heltec T114 seleciona o ZIP DFU (.zip).');
    }
  }

  return file;
}

async function blobToBinaryString(blob: Blob): Promise<string> {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  const chunk = 0x8000;
  let out = '';
  for (let i = 0; i < bytes.length; i += chunk) {
    out += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return out;
}

async function resetEspTransport(transport: InstanceType<typeof Transport>) {
  try {
    await transport.setRTS(true);
    await new Promise((resolve) => window.setTimeout(resolve, 100));
    await transport.setRTS(false);
  } catch {
    // The port may already have reset/re-enumerated.
  }
}

async function flashEsp32(options: UsbFlashOptions, firmware: Blob, filename: string) {
  const serial = serialApi();
  const port = await serial.requestPort({});
  let transport: InstanceType<typeof Transport> | null = null;

  const merged = filename.toLowerCase().endsWith('-merged.bin');
  if (options.erase && !merged) {
    throw new Error('O apagamento total do V3 exige uma imagem merged.');
  }

  try {
    report(options, 10, 'A ligar ao Heltec V3…');
    transport = new Transport(port, true);

    const terminal = {
      clean: () => undefined,
      write: (data: string) => log(options, String(data)),
      writeLine: (data: string) => log(options, String(data)),
    };

    const flashOptions: Record<string, unknown> = {
      terminal,
      transport,
      compress: true,
      eraseAll: options.erase,
      flashSize: 'keep',
      flashMode: 'keep',
      flashFreq: 'keep',
      baudrate: 115200,
      romBaudrate: 115200,
      enableTracing: false,
      fileArray: [{
        data: await blobToBinaryString(firmware),
        address: merged ? 0x0000 : 0x10000,
      }],
      reportProgress: async (_fileIndex: number, written: number, total: number) => {
        const pct = total > 0 ? (written / total) * 100 : 0;
        report(options, 15 + pct * 0.82, options.erase ? 'A apagar e instalar no V3…' : 'A instalar no V3…');
      },
    };

    const loader = new ESPLoader(flashOptions);
    loader.hr = new HardReset(transport);
    await loader.main();
    await loader.flashId();
    await loader.writeFlash(flashOptions);
    report(options, 98, 'A reiniciar o Heltec V3…');
    await loader.after('hard_reset');
    await new Promise((resolve) => window.setTimeout(resolve, 120));
    await resetEspTransport(transport);
  } finally {
    if (transport) {
      try { await transport.disconnect(); } catch { /* ignored */ }
    }
  }
}

async function getT114Eraser(release: GithubRelease): Promise<Blob> {
  const asset = (release.assets || []).find((item) => item.name === T114_ERASER);
  if (!asset) {
    throw new Error(
      'A release não contém o formatter de flash do T114. Atualiza para uma release HiveFW que inclua o asset de erase.',
    );
  }
  return downloadBlob(asset);
}

async function runDfu(
  options: UsbFlashOptions,
  blob: Blob,
  start: number,
  span: number,
  stage: string,
) {
  const port = await serialApi().requestPort({});
  const dfu = new Dfu(port, false);
  await dfu.dfuUpdate(
    blob,
    (progress: number) => report(options, start + (progress / 100) * span, stage),
    60000,
  );
}

async function flashT114(
  options: UsbFlashOptions,
  firmware: Blob,
  release: GithubRelease | null,
) {
  if (options.erase) {
    if (!release) {
      // Manual firmware still uses the formatter from the current HiveFW release.
      release = await fetchLatestRelease();
    }
    report(options, 8, 'A preparar apagamento do T114…');
    const eraser = await getT114Eraser(release);
    log(options, 'T114 erase: seleciona a porta DFU para executar o formatter.');
    await runDfu(options, eraser, 10, 32, 'A apagar dados do T114…');
    report(options, 44, 'Formatter concluído. Volta a colocar o T114 em DFU e seleciona a porta.');
    log(options, 'Formatter concluído. O T114 reinicia; entra novamente em DFU para instalar a firmware.');
  }

  await runDfu(
    options,
    firmware,
    options.erase ? 48 : 10,
    options.erase ? 50 : 88,
    'A instalar firmware no T114…',
  );
}

export async function forceT114DfuMode(): Promise<void> {
  const port = await serialApi().requestPort({});
  await Dfu.forceDfuMode(port);
}

export async function flashUsbFirmware(options: UsbFlashOptions): Promise<{
  source: UsbFlashSource;
  filename: string;
  release?: string;
}> {
  if (!usbFlasherSupported()) {
    throw new Error('Web Serial indisponível. Usa Chrome/Edge num contexto HTTPS.');
  }

  let blob: Blob;
  let filename: string;
  let release: GithubRelease | null = null;

  if (options.source === 'latest') {
    const latest = await latestFirmware(options);
    blob = latest.blob;
    filename = latest.name;
    release = latest.release;
  } else {
    const file = validateManualFile(options);
    blob = file;
    filename = file.name;
  }

  if (options.hardware === 'heltec-v3') {
    await flashEsp32(options, blob, filename);
  } else {
    await flashT114(options, blob, release);
  }

  report(options, 100, 'Instalação concluída.');
  return {
    source: options.source,
    filename,
    ...(release ? { release: release.tag_name } : {}),
  };
}
