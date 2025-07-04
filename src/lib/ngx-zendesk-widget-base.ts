import { NgxZendeskWidgetConfig } from "./ngx-zendesk-widget.model";

export abstract class NgxZendeskWidgetBase implements INgxZendeskWidget {
  private _config: NgxZendeskWidgetConfig | null = null;
  private _zE: any;
  private _initialized: boolean = false;

  constructor(config: NgxZendeskWidgetConfig) {
    if (!config.accountUrl) {
      throw new Error(
        "Missing accountUrl. Please provide a valid Zendesk account URL."
      );
    }
    if (!config.version) {
      throw new Error(
        "Missing version. Please provide a valid Zendesk widget version."
      );
    }
    this._config = config;
  }

  get version(): number {
    if (!this._config) {
      throw new Error(
        "Configuration is not set. Please initialize the widget first."
      );
    }
    return this._config.version;
  }

  get config(): NgxZendeskWidgetConfig {
    if (!this._config) {
      throw new Error(
        "Configuration is not set. Please initialize the widget first."
      );
    }
    return this._config;
  }

  set zE(value: any) {
    if (!value) {
      throw new Error("zE cannot be set to null or undefined.");
    }
    this._zE = value;
  }

  get zE(): any {
    if (!this._zE) {
      throw new Error(
        "zE is not initialized. Please set zE before accessing it."
      );
    }
    return this._zE;
  }

  set initialized(value: boolean) {
    this._initialized = value;
  }

  get initialized(): boolean {
    if (this._initialized === undefined) {
      throw new Error(
        "initialized state is not set. Please initialize the widget first."
      );
    }
    return this._initialized;
  }

  destroy(): void {
    if (this._zE && this._zE.destroy) {
      this._zE.destroy();
    }
    this.hide();
    this._initialized = false;
    this._zE = null;
    this._config = null;
  }

  abstract open(): void;
  abstract close(): void;
  abstract show(): void;
  abstract hide(): void;
  abstract authenticate(...args: any[]): void;
}

export interface INgxZendeskWidget {
  open(): void;
  close(): void;
  show(): void;
  hide(): void;
  authenticate(...args: any[]): void;

  destroy(): void;

  get config(): NgxZendeskWidgetConfig;
  get version(): number;

  set initialized(value: boolean);
  get initialized(): boolean;

  set zE(value: any);
  get zE(): any;
}
