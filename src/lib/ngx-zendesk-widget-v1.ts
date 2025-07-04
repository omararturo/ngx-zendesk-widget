import { NgxZendeskWidgetBase } from "./ngx-zendesk-widget-base";

export class NgxZendeskWidgetV1 extends NgxZendeskWidgetBase {
  open(): void {
    if (!this.zE) {
      throw new Error(
        "zE is not initialized. Please set zE before calling open."
      );
    }
    this.zE("webWidget", "open");
  }

  close(): void {
    if (!this.zE) {
      throw new Error(
        "zE is not initialized. Please set zE before calling close."
      );
    }
    this.zE("webWidget", "close");
  }

  show(): void {
    if (!this.zE) {
      throw new Error(
        "zE is not initialized. Please set zE before calling show."
      );
    }
    this.zE("webWidget", "show");
  }

  hide(): void {
    if (!this.zE) {
      throw new Error(
        "zE is not initialized. Please set zE before calling hide."
      );
    }
    this.zE("webWidget", "hide");
  }

  authenticate(data: object): void {
    console.log(data);
    if (!this.zE) {
      throw new Error(
        "zE is not initialized. Please set zE before calling authenticate."
      );
    }
    this.zE("webWidget", "identify", data);
  }
}
