# Mobile Control React App Core Library

This library uses vite for React.

The purpose of this library is to provide the necessary building blocks to make developing React apps for Mobile Control easier and more efficient.

Primarily, it provides a series of React hooks that handle API interaction with corresponding messengers in the [Essentials Mobile Control Plugin](https://github.com/PepperDash/epi-essentials-mobile-control) (or other Essentials plugins) as well as typescript interfaces for the device state objects that each messenger uses.

In addition, it also provides some core React components that can be consumed by a React App and deal with the particulars of running an HTML5 app on a touch device and allow interaction between button events to achieve press/hold/release functionality commonly necessary for things like ramping volume controls or sending IR commands.

At the core of this library is a React Context that is intended to generate a websocket client that handles all the messaging to and from the Mobile Control Plugin.  Along with that context, Redux is used to handle maintining the state for the room and all devices relevant to the current session.  Redux selectors are provided for accessing common data in the store by room or device.

## How Mobile Control Works

Mobile control uses a websocket to allow JSON formatted messages to be passed between the client app, running in React, and the Essentials Control System application.

When the client initially connects to the control system, it makes an HTTP call to join a particular room.  The response to that call provides the React app with the necessary information to connect to the websocket server. The server can either be running directly on the Crestron control system processor or it can also be running on the Mobile Control Edge Server, which then acts as a message relay to the control system.

Once a websocket connection is established, the React app must then request the room state and configuration which it will subsequently use to determine which device states it needs to request from the control system.

Supplied in this library is a hook (useGetAllDeviceStateFromRoomConfiguration) that takes a RoomConfiguration object and will then iterate the devices for that room and request their current full status.  This hook should be called at the root level of the React App.

From that point forward, room and device state messages from the control system will be partial objects and will get overlayed onto the room/device state object in the store.

## How this Library is Intended to be Used

The intent is to use the various hooks provided in this library to easily link up to buttons and other elements on an HTML5 UI in a React App to handle the heavy lifting of integrating with the Mobile Control API.  This library will provide hooks for the messengers in the Mobile Control plugin, but you will also be able to write hooks in the React App for custom API that can integrate directly with a messenger defined in any Essentials room or device plugin.  This allows consistency with the core communication that most systems will rely on, while also providing easy customization and extensibility for more esoteric or application specific needs that may not see wide use and justify inclusion in this library.