import { NgxZendeskWidgetBase } from "./ngx-zendesk-widget-base";

export class NgxZendeskWidgetV2 extends NgxZendeskWidgetBase {
  open(): void {
    if (!this.zE) {
      throw new Error(
        "zE is not initialized. Please set zE before calling open."
      );
    }
    this.zE("messenger", "open");
  }

  close(): void {
    if (!this.zE) {
      throw new Error(
        "zE is not initialized. Please set zE before calling close."
      );
    }
    this.zE("messenger", "close");
  }

  show(): void {
    if (!this.zE) {
      throw new Error(
        "zE is not initialized. Please set zE before calling show."
      );
    }
    this.zE("messenger", "show");
  }

  hide(): void {
    if (!this.zE) {
      throw new Error(
        "zE is not initialized. Please set zE before calling hide."
      );
    }
    this.zE("messenger", "hide");
  }

  authenticate(jwtCallback: () => void, loginCallback: () => void): void {
    if (!this.zE) {
      throw new Error(
        "zE is not initialized. Please set zE before calling authenticate."
      );
    }

    this.zE("messenger", "loginUser", jwtCallback, loginCallback);
  }
}
