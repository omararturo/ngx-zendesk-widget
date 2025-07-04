import { Injectable } from "@angular/core";
import { NgxZendeskWidgetConfig } from "./ngx-zendesk-widget.model";
import { NgxZendeskWidgetV1 } from "./ngx-zendesk-widget-v1";
import { NgxZendeskWidgetV2 } from "./ngx-zendesk-widget-v2";
import { INgxZendeskWidget } from "./ngx-zendesk-widget-base";

function getWindow(): any {
  return window;
}

@Injectable({
  providedIn: "root",
})
export class NgxZendeskWidgetService {
  private readonly window: any;
  private zendeskWidget: INgxZendeskWidget | null = null;

  constructor() {
    this.window = getWindow();
  }

  public initZendesk(
    ngxZendeskWidgetConfig: NgxZendeskWidgetConfig
  ): Promise<boolean> {
    switch (ngxZendeskWidgetConfig.version) {
      case 1:
        this.zendeskWidget = new NgxZendeskWidgetV1(ngxZendeskWidgetConfig);
        break;
      case 2:
        this.zendeskWidget = new NgxZendeskWidgetV2(ngxZendeskWidgetConfig);
        break;
      default:
        throw new Error(
          `Unsupported version: ${ngxZendeskWidgetConfig.version}. Supported versions are 1 and 2.`
        );
    }

    const window = this.window;

    // tslint:disable
    window.zEmbed ||
      (function (e, t) {
        // @ts-ignore
        let n,
          o,
          d,
          i,
          s,
          // @ts-ignore
          a = [];
        let r = document.createElement("iframe");
        window.zEmbed = function () {
          a.push(arguments);
        };
        window.zE = window.zE || window.zEmbed;
        r.src = "javascript:false";
        r.title = "";
        r.style.cssText = "display: none";
        d = document.getElementsByTagName(
          ngxZendeskWidgetConfig.injectionTag || "head"
        );
        d = d[d.length - 1];
        // @ts-ignore
        d.parentNode.insertBefore(r, d);
        i = r.contentWindow;
        // @ts-ignore
        s = i.document;
        try {
          o = s;
        } catch (e) {
          n = document.domain;
          r.src =
            'javascript:var d=document.open();d.domain="' + n + '";void(0);';
          o = s;
        }
        // @ts-ignore
        o.open()._l = function () {
          let e = this.createElement("script");
          // @ts-ignore
          n && (this.domain = n);
          e.id = "js-iframe-async";
          e.src = "https://static.zdassets.com/ekr/snippet.js";
          // @ts-ignore
          this.t += new Date();
          // @ts-ignore
          this.zendeskHost = ngxZendeskWidgetConfig.accountUrl;
          // @ts-ignore
          this.zEQueue = a;
          this.body.appendChild(e);
        };
        o.write('<body onload="document._l();">');
        o.close();
      })();
    // tslint:enable

    return this.finishLoading();
  }

  private finishLoading(): Promise<boolean> {
    if (!this.zendeskWidget) {
      return Promise.reject(new Error("Zendesk widget is not initialized."));
    }

    return new Promise<boolean>((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.zendeskWidget!.initialized = false;
        reject(Error("timeout"));
      }, this.zendeskWidget?.config?.timeOut || 30000); // 30 seconds

      this.window.zE(() => {
        this.zendeskWidget!.config?.callback(this.window.zE);
        this.zendeskWidget!.initialized = true;
        this.zendeskWidget!.zE = this.window.zE;
        clearTimeout(timeout);
        resolve(true);
      });
    });
  }

  get isInitialized(): boolean {
    return this.zendeskWidget?.initialized || false;
  }

  get zE(): any {
    return this.zendeskWidget?.zE || null;
  }

  get version(): number {
    if (!this.zendeskWidget) {
      throw new Error("Zendesk widget is not initialized.");
    }
    return this.zendeskWidget.config.version;
  }

  open(): void {
    if (!this.zendeskWidget) {
      throw new Error("Zendesk widget is not initialized.");
    }
    this.zendeskWidget.open();
  }

  close(): void {
    if (!this.zendeskWidget) {
      throw new Error("Zendesk widget is not initialized.");
    }
    this.zendeskWidget.close();
  }

  show(): void {
    if (!this.zendeskWidget) {
      throw new Error("Zendesk widget is not initialized.");
    }
    this.zendeskWidget.show();
  }

  hide(): void {
    if (!this.zendeskWidget) {
      throw new Error("Zendesk widget is not initialized.");
    }
    this.zendeskWidget.hide();
  }

  authenticate(...args: any[]): void {
    if (!this.zendeskWidget) {
      throw new Error("Zendesk widget is not initialized.");
    }
    this.zendeskWidget.authenticate(...args);
  }

  destroy(): void {
    if (!this.zendeskWidget) {
      throw new Error("Zendesk widget is not initialized.");
    }
    this.zendeskWidget.destroy();
    this.zendeskWidget = null;
  }
}
