declare module './usb-flasher/vendor/esp32.js' {
  export class Transport {
    constructor(port: unknown, tracing?: boolean);
    disconnect(): Promise<void>;
    setRTS(value: boolean): Promise<void>;
  }
  export class HardReset {
    constructor(transport: Transport);
    reset(): Promise<void>;
  }
  export class ESPLoader {
    constructor(options: Record<string, unknown>);
    hr: HardReset;
    main(): Promise<void>;
    flashId(): Promise<void>;
    writeFlash(options: Record<string, unknown>): Promise<void>;
    after(mode: string): Promise<void>;
  }
}

declare module './usb-flasher/vendor/dfu.js' {
  export class Dfu {
    constructor(port: unknown, eraseBeforeUpdate?: boolean);
    static forceDfuMode(port: unknown): Promise<void>;
    dfuUpdate(
      zipFile: Blob,
      progressCallback?: (progress: number) => void | Promise<void>,
      timeout?: number,
    ): Promise<void>;
  }
}
