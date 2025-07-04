# NgxZendeskWidget

An Angular library for integrating Zendesk Chat/Support widgets into your Angular applications. This library supports both Zendesk Widget V1 (legacy) and V2 (messenger) implementations.

[![npm version](https://badge.fury.io/js/ngx-zendesk-widget.svg)](https://badge.fury.io/js/ngx-zendesk-widget)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🚀 Easy integration with Angular applications
- 🔄 Support for both Zendesk Widget V1 and V2
- 📱 Mobile-friendly implementation
- 🎯 TypeScript support with full type definitions
- ⚡ Lightweight and performant
- 🛠️ Configurable injection and timeout options

## Installation

Install the library using npm:

```bash
npm install ngx-zendesk-widget
```

## Quick Start

### 1. Import the Service

Import the `NgxZendeskWidgetService` in your component:

```typescript
import { Component, OnInit } from "@angular/core";
import { NgxZendeskWidgetService } from "ngx-zendesk-widget";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  constructor(private zendeskService: NgxZendeskWidgetService) {}

  async ngOnInit() {
    // Initialize Zendesk Widget
    await this.initializeZendesk();
  }

  private async initializeZendesk() {
    try {
      await this.zendeskService.initZendesk({
        version: 2, // Use version 1 for legacy widget, 2 for messenger
        accountUrl: "https://your-account.zendesk.com",
        timeOut: 30000,
        injectionTag: "head",
        callback: (zE: any) => {
          console.log("Zendesk initialized successfully");
          // Additional configuration can be done here
        },
      });
    } catch (error) {
      console.error("Failed to initialize Zendesk:", error);
    }
  }
}
```

### 2. Widget Controls

Control the widget programmatically:

```typescript
// Open the widget
this.zendeskService.open();

// Close the widget
this.zendeskService.close();

// Show the widget
this.zendeskService.show();

// Hide the widget
this.zendeskService.hide();

// Check if widget is initialized
if (this.zendeskService.isInitialized) {
  console.log("Widget is ready to use");
}

// Get the current widget version
console.log("Widget version:", this.zendeskService.version);

// Authenticate user (optional)
this.zendeskService.authenticate({
  name: "John Doe",
  email: "john@example.com",
});

// Destroy the widget
this.zendeskService.destroy();

// Access the Zendesk zE object directly (for advanced usage)
const zE = this.zendeskService.zE;
if (zE) {
  // You can use this for extended compatibility, but you need to check the version
  zE(this.zendeskService.version === 1 ? "webWidget" : "messenger", "hide");
}
```

## Configuration Options

The `NgxZendeskWidgetConfig` accepts the following options:

| Property       | Type                                     | Required | Description                                                        |
| -------------- | ---------------------------------------- | -------- | ------------------------------------------------------------------ |
| `version`      | `1 \| 2`                                 | Yes      | Zendesk widget version (1 for legacy, 2 for messenger)             |
| `accountUrl`   | `string`                                 | Yes      | Your Zendesk account URL (e.g., 'https://company.zendesk.com')     |
| `timeOut`      | `number`                                 | No       | Timeout in milliseconds for widget initialization (default: 30000) |
| `injectionTag` | `'head' \| 'body' \| 'script' \| string` | No       | Where to inject the Zendesk script (default: 'head')               |
| `callback`     | `(zE: any) => void`                      | Yes      | Callback function executed after successful initialization         |

## Advanced Usage

### Standalone Components (Angular 14+)

If you're using standalone components, inject the service directly:

```typescript
import { Component, inject, OnInit } from "@angular/core";
import { NgxZendeskWidgetService } from "ngx-zendesk-widget";

@Component({
  selector: "app-chat",
  standalone: true,
  template: ` <button (click)="openChat()">Open Support Chat</button> `,
})
export class ChatComponent implements OnInit {
  private zendeskService = inject(NgxZendeskWidgetService);

  async ngOnInit() {
    await this.zendeskService
      .initZendesk({
        version: 2,
        accountUrl: "https://your-account.zendesk.com",
        callback: (zE: any) => {
          console.log("Zendesk Widget initialized", zE);
          console.log("Zendesk Version:", this.zendeskService.version);
          // You can use zE directly for extended compatibility, but check the version
        },
      })
      .then(() => {
        this.zendeskService.hide();
      });
  }

  openChat() {
    this.zendeskService.open();
  }
}
```

### Complete Example

Here's a complete example based on a real implementation:

```typescript
import { Component } from "@angular/core";
import { NgxZendeskWidgetService } from "ngx-zendesk-widget";

@Component({
  selector: "app-root",
  template: `
    <div>
      <h1>Zendesk Widget Demo</h1>
      <button (click)="showZendesk()">Show Widget</button>
      <button (click)="hideZendesk()">Hide Widget</button>
      <button (click)="openZendesk()">Open Chat</button>
      <button (click)="closeZendesk()">Close Chat</button>
      <button (click)="authZendesk()">Authenticate User</button>
      <button (click)="destroy()">Destroy Widget</button>
    </div>
  `,
})
export class AppComponent {
  constructor(private zendeskService: NgxZendeskWidgetService) {
    this.initializeWidget();
  }

  private async initializeWidget() {
    try {
      await this.zendeskService.initZendesk({
        accountUrl: "your-account.zendesk.com", // Don't include https://
        version: 1, // or 2 for messenger
        timeOut: 30000,
        injectionTag: "head",
        callback: (zE) => {
          console.log("Zendesk Widget initialized", zE);
          console.log("Zendesk Version:", this.zendeskService.version);
        },
      });

      // Hide the widget initially
      this.zendeskService.hide();
    } catch (error) {
      console.error("Failed to initialize Zendesk:", error);
    }
  }

  showZendesk() {
    this.zendeskService.show();
  }

  hideZendesk() {
    this.zendeskService.hide();
  }

  openZendesk() {
    this.zendeskService.open();
  }

  closeZendesk() {
    this.zendeskService.close();
  }

  authZendesk() {
    this.zendeskService.authenticate({
      name: "John Doe",
      email: "john@example.com",
    });
  }

  destroy() {
    this.zendeskService.destroy();
  }
}
```

## API Reference

### NgxZendeskWidgetService

#### Methods

| Method                | Parameters                        | Return Type        | Description                                                   |
| --------------------- | --------------------------------- | ------------------ | ------------------------------------------------------------- |
| `initZendesk(config)` | `NgxZendeskWidgetConfig`          | `Promise<boolean>` | Initialize the Zendesk widget with the provided configuration |
| `open()`              | None                              | `void`             | Open the widget window                                        |
| `close()`             | None                              | `void`             | Close the widget window                                       |
| `show()`              | None                              | `void`             | Show the widget button/launcher                               |
| `hide()`              | None                              | `void`             | Hide the widget button/launcher                               |
| `authenticate(user)`  | `{ name: string, email: string }` | `void`             | Authenticate a user for the widget                            |
| `destroy()`           | None                              | `void`             | Destroy the widget instance and clean up resources            |

#### Properties

| Property        | Type      | Description                                                  |
| --------------- | --------- | ------------------------------------------------------------ |
| `isInitialized` | `boolean` | Returns true if the widget has been successfully initialized |
| `version`       | `number`  | Returns the current widget version (1 or 2)                  |
| `zE`            | `any`     | Direct access to the Zendesk zE object for advanced usage    |

### User Authentication

You can authenticate users to provide a personalized experience:

```typescript
// Authenticate a user
this.zendeskService.authenticate({
  name: "John Doe",
  email: "john@example.com",
});
```

## Version Differences

#### Widget V1 (Legacy)

- Uses `webWidget` API
- Suitable for existing implementations
- Classic chat widget appearance

#### Widget V2 (Messenger)

- Uses `messenger` API
- Modern conversational interface
- Recommended for new implementations

## Error Handling

The library includes built-in error handling:

```typescript
try {
  await this.zendeskService.initZendesk(config);
  this.zendeskService.open();
} catch (error) {
  if (error.message.includes("not initialized")) {
    console.error("Widget not properly initialized");
  } else if (error.message.includes("Unsupported version")) {
    console.error("Invalid widget version specified");
  }
}
```

## Browser Support

This library supports all modern browsers that are compatible with Angular and the Zendesk widget:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Development

### Building the Library

To build the library, run:

```bash
ng build ngx-zendesk-widget
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

Execute the unit tests:

```bash
ng test ngx-zendesk-widget
```

### Publishing

1. Build the library:

   ```bash
   ng build ngx-zendesk-widget
   ```

2. Navigate to the dist directory:

   ```bash
   cd dist/ngx-zendesk-widget
   ```

3. Publish to npm:
   ```bash
   npm publish
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues and questions:

- Create an issue on [GitHub](https://github.com/your-username/ngx-zendesk-widget/issues)
- Check the [Zendesk Developer Documentation](https://developer.zendesk.com/documentation/zendesk-web-widget/)

## Changelog

### v0.0.1

- Initial release
- Support for Zendesk Widget V1 and V2
- TypeScript support
- Configurable initialization options
