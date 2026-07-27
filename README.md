# Mobile Control React App Core Library

This library provides the necessary building blocks for developing React apps for [PepperDash Mobile Control](https://github.com/PepperDash/epi-essentials-mobile-control) systems. It is built with Vite and includes:

- **React hooks** — Handle API interaction with corresponding messengers in the Essentials Mobile Control Plugin (or other Essentials plugins)
- **TypeScript interfaces** — Typed device state objects for each messenger
- **Core React components** — Handle touch device interaction, including press/hold/release functionality needed for things like volume ramping and IR commands
- **WebSocket context** — Generates and manages a WebSocket client for all messaging between the app and the Mobile Control Plugin
- **Redux store** — Maintains room and device state for the current session, with selectors for accessing data by room or device

## How Mobile Control Works

Mobile Control uses a WebSocket to pass JSON messages between a React client and the Essentials control system application. The connection flow is:

1. The client makes an HTTP call to join a room on the control system
2. The response provides the information needed to open a WebSocket connection
3. The WebSocket server can run directly on the Crestron processor or on the Mobile Control Edge Server (which relays messages to the processor)
4. Once connected, the app requests the room state and configuration
5. The app uses that configuration to determine which device states to request — the `useGetAllDeviceStateFromRoomConfiguration` hook handles this automatically and should be called at the root level of your app
6. From that point on, room and device state updates arrive as partial objects and are merged into the Redux store

## How this Library is Intended to be Used

Use the provided hooks to link buttons and UI elements to the Mobile Control API without managing the communication layer directly:

- **Core hooks** (provided here) — Cover the standard messengers in the Mobile Control Plugin and handle the common needs of most systems
- **Custom hooks** (written in your app) — Can integrate directly with any messenger defined in an Essentials room or device plugin, enabling extensibility for application-specific or esoteric needs without requiring changes to this library

# How to Set up Your Development Environment

### Prerequisites

- Essentials v2.x program loaded to a Crestron program slot
- Essentials Mobile Control Plugin v4.x configured in that program (consult the plugin docs for server configuration)

### Steps

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a local config file by copying the default:
   ```
   /public/_local-config/_config.default.json  →  /public/_local-config/_config.local.json
   ```
   Update the `apiPath` value to the IP address and port of your test processor. **Do not commit this file** — it is gitignored.

   Example `_config.local.json`:
   ```json
   {
     "apiPath": "http://192.168.1.22:50010/mc/api",
     "gatewayAppPath": "",
     "enableDev": false,
     "logoPath": "logo/PDT-logo-no-tag_blue-pdt-on-transp_1000px.png",
     "loginMode": "room-list",
     "iconSet": "GOOGLE",
     "modes": {
       "room-list": {
         "listPageText": "Please select your room",
         "loginHelpText": "Please select your room from the list, then enter the code shown on the display in the room. (Configurable message)",
         "passcodePageText": "Please enter the code shown on this room's display"
       }
     }
   }
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the printed local URL in a browser (e.g. `http://localhost:5173/mc/app`). You will see a disconnected message until a token is provided.

5. Get a connection token from the Crestron processor by running the console command:
   ```
   mobileinfo:[programSlot]
   ```
   Example output:
   ```
    mobileadduiclient:1 room1 1234567890abcdefghijk
    mobileinfo

    Mobile Control Edge Server API Information:
        Not Enabled in Config.

    Mobile Control Direct Server Infromation:
        User App URL: http://10.11.50.177:50001/mc/app?token=[insert_client_token]
        Server port: 50001

        UI Client Info:
        Tokens Defined: 1
        Clients Connected: 0

    Client 1:
    Room Key: room1
    Token: f0f19b7e-606a-4f91-875e-7847e28bc709
    Client URL: http://10.11.50.177:50001/mc/app?token=f0f19b7e-606a-4f91-875e-7847e28bc709
    Connected: False
    Duration: Not Connected
   ```
   Copy the token value for the client instance you want to connect to.

6. Append the token to the URL and reload:
   ```
   http://localhost:5173/mc/app?token=[your-token-value]
   ```

Your development client will now connect to the WebSocket server running on the Crestron program.

# Using this Library in an Existing Application

This section covers integrating the library into an existing React app rather than developing the library itself.

### 1. Install the package and its peer dependencies

The library is published as `@pepperdash/mobile-control-react-app-core`. It declares `react`, `react-dom`, `react-redux`, `react-router-dom`, `@reduxjs/toolkit`, `axios`, and `lodash` as peer dependencies — install any that your app doesn't already have:

```bash
npm install @pepperdash/mobile-control-react-app-core
npm install react react-dom react-redux react-router-dom @reduxjs/toolkit axios lodash
```

`@crestron/ch5-webxpanel` and `@pepperdash/ch5-crcomlib-lite` are regular dependencies of the library and will be installed automatically.

### 2. Add the local config file

The library fetches its API connection settings at runtime from `/_local-config/_config.local.json`, so your app needs its own copy of that file in its `public/` directory:

```
public/_local-config/_config.local.json
```

Use [`_config.default.json`](public/_local-config/_config.default.json) in this repo as a starting template, and set `apiPath` to your control system's Mobile Control endpoint (e.g. `http://192.168.1.22:50010/mc/api`). **Do not commit this file** — add `_config.local.json` to your `.gitignore`.

### 3. Set up a router

The library uses React Router hooks internally (error handling, navigation), so a router must be present in the component tree — `MobileControlProvider` alone is not sufficient. Create a `createBrowserRouter` with a `basename` matching your app's mount path and render it with `RouterProvider` **outside** `MobileControlProvider`:

```tsx
// src/main.tsx
import '@pepperdash/mobile-control-react-app-core/style.css';
import { ErrorBox } from '@pepperdash/mobile-control-react-app-core';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';

const router = createBrowserRouter(
  [{ path: '*', Component: App, errorElement: <ErrorBox /> }],
  { basename: '/mc/app' }
);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

See [docs/url-routing-app-dev.md](docs/url-routing-app-dev.md) for more detail, including how the library derives the token/room-key from the URL.

### 4. Wrap your app in `MobileControlProvider`

`MobileControlProvider` supplies the Redux store and WebSocket context every hook in this library depends on:

```tsx
// src/App.tsx
import { MobileControlProvider } from '@pepperdash/mobile-control-react-app-core';
import MyRoomUI from './MyRoomUI';

function App() {
  return (
    <MobileControlProvider>
      <MyRoomUI />
    </MobileControlProvider>
  );
}

export default App;
```

### 5. Request room and device state, then build your UI with hooks

At (or near) the root of your UI, resolve the room key/configuration and call `useGetAllDeviceStateFromRoomConfiguration` once so device state starts flowing in. From there, use the interface hooks (`useIHasPowerControl`, `useITransport`, etc.) in individual components to read state and dispatch actions:

```tsx
import {
  useGetAllDeviceStateFromRoomConfiguration,
  useRoomConfiguration,
  useRoomKey,
} from '@pepperdash/mobile-control-react-app-core';

function MyRoomUI() {
  const roomKey = useRoomKey();
  const config = useRoomConfiguration(roomKey);
  useGetAllDeviceStateFromRoomConfiguration({ config });

  // ...render components that use interface hooks, e.g. useIHasPowerControl(deviceKey)
}
```

See [docs/interface-hooks-app-dev.md](docs/interface-hooks-app-dev.md) for the full hook catalog, [docs/redux-state-app-dev.md](docs/redux-state-app-dev.md) for how state is organized, and [docs/device-state-feedback-app-dev.md](docs/device-state-feedback-app-dev.md) for how feedback updates arrive.

### 6. (Optional) Zoom Room Controller / WebXPanel support

If your app may be loaded as a Zoom Room Controller (ZRC) device panel, the library automatically establishes a WebXPanel/CIP connection when the URL includes `?zoomRoom=true` — no additional setup is required beyond loading the app with that query parameter present.
