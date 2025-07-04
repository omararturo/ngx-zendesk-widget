export abstract class NgxZendeskWidgetConfig {
  timeOut!: number;
  injectionTag!: "head" | "body" | "script" | string;
  abstract version: number;
  abstract accountUrl: string;
  abstract callback(zE: any): any;
}
