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
