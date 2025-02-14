# API Documentation

## Table of Contents

- [Uncategorized](#uncategorized)

## Uncategorized

### AppConfig

**Kind:** class

**Group:** Other

**Source:** `lib/types/classes/app-config.ts`

Contains configuration data for the MC application

#### Definition

- `enableDev`: `boolean`
- `apiPath`: `string`
- `gatewayAppPath`: `string`
- `logoPath`: `string`
- `iconSet`: `IconType`
- `loginMode`: `string`
- `modes`: `{ [key: string]: unknown`

---

### AppConfig

**Kind:** class

**Group:** Other

**Source:** `lib/store/appConfig/appConfig.slice.ts`

Contains configuration data for the MC application

#### Definition

- `enableDev`: `boolean`
- `apiPath`: `string`
- `gatewayAppPath`: `string`
- `logoPath`: `string`
- `iconSet`: `IconType`
- `loginMode`: `string`
- `modes`: `{ [key: string]: unknown`

---

### CameraCapabilities

**Kind:** class

**Group:** Other

**Source:** `lib/types/state/state/CameraState.ts`

Describes a camera's capabilities

#### Definition

- `canPan`: `boolean`
- `canTilt`: `boolean`
- `canZoom`: `boolean`
- `canFocus`: `boolean`

---

### CameraState

**Kind:** class

**Group:** Other

**Source:** `lib/types/state/state/CameraState.ts`

Used for an individual camera state

#### Definition

- `cameraManualSupported`: `boolean`
- `cameraAutoSupported`: `boolean`
- `cameraOffSupported`: `boolean`
- `cameraMode`: `string`
- `hasPresets`: `boolean`
- `presets`: `unknown[]`
- `capabilities`: `CameraCapabilities`
- `isFarEnd`: `boolean`

---

### CamerasState

**Kind:** class

**Group:** Other

**Source:** `lib/types/state/state/CamerasState.ts`

Used for the state of all cameras for a codec

#### Definition

- `cameraManualSupported`: `boolean`
- `cameraAutoSupported`: `boolean`
- `cameraOffSupported`: `boolean`
- `cameraMode`: `string`
- `cameraList`: `unknown[]`
- `selectedCamera`: `CameraState`

---

### DeviceState

**Kind:** class

**Group:** Other

**Source:** `lib/types/state/state/DeviceState.ts`

Base device state class

#### Definition

- `key`: `string`
- `name`: `string`
- `messageType`: `string`
- `eventType`: `string`
- `content`: `unknown`
- `interfaces`: `InterfaceNames[]`
- `commMonitor`: `CommunicationMonitorState`
- `state`: `unknown`
- `configuration`: `unknown`

---

### LightingScene

**Kind:** class

**Group:** Other

**Source:** `lib/types/state/environment/lightingScene.ts`

Describes an instance of a lighting scene

#### Definition

- `name`: `string`
- `id`: `string`
- `isActive`: `boolean`

---

### PartnerMetadata

**Kind:** class

**Group:** Other

**Source:** `lib/types/classes/app-config.ts`

Contains metadata for partners

#### Definition

- `role`: `string`
- `description`: `string`
- `logoPath`: `string`

---

### Room

**Kind:** class

**Group:** Other

**Source:** `lib/types/classes/room.ts`

Contains data about a Room

#### Definition

- `systemUuid`: `string`
- `roomKey`: `string`
- `name`: `string`

---

### RoomState

**Kind:** class

**Group:** Other

**Source:** `lib/types/state/state/RoomState.ts`

Base device state class

#### Definition

- `activityMode`: `number`
- `advancedSharingActive`: `boolean`
- `configuration`: `RoomConfiguration`
- `isCoolingDown`: `boolean`
- `isInCall`: `boolean`
- `isOn`: `boolean`
- `isWarmingUp`: `boolean`
- `selectedSourceKey`: `string`
- `share`: `ShareState`
- `volumes`: `Record<string, Volume>`
- `scheduleEvents`: `ScheduleEvent[]`

---

### SessionStorageKeys

**Kind:** class

**Group:** Other

**Source:** `lib/types/classes/session-storage-keys.ts`

---

### SessionStorageValues

**Kind:** class

**Group:** Other

**Source:** `lib/types/classes/session-storage-values.ts`

#### Definition

- `uuid`: `string`
- `roomKey`: `string`
- `code`: `string`
- `expiry`: `string`

---

### ShareState

**Kind:** class

**Group:** Other

**Source:** `lib/types/state/state/ShareState.ts`

#### Definition

- `currentShareText`: `string`
- `enabled`: `boolean`
- `isSharing`: `boolean`

---

### SimpleContent

**Kind:** class

**Group:** Other

**Source:** `lib/types/SimpleContent.ts`

Describes the content of a simple message that contains a single value

#### Definition

- `value`: `boolean | number | string`

---

### const

**Kind:** function

**Group:** Other

**Source:** `lib/utils/WebsocketProvider.tsx`

The context component that contains the websocket connection and provides the functions to send messages
Must wrap all other components

---

### const

**Kind:** function

**Group:** Other

**Source:** `lib/utils/WebsocketProvider.tsx`

Stores event handlers for the websocket
key: a unique key for the handler to allow for removal
eventType: the type of event to listen for
callback: the function to call when the event is received that takes the message as an argument
if additional data is required beyond the eventType

---

### const

**Kind:** function

**Group:** Other

**Source:** `lib/utils/WebsocketProvider.tsx`

Gets the room data from the api and stores it in the store

---

### const

**Kind:** function

**Group:** Other

**Source:** `lib/utils/WebsocketProvider.tsx`

Sends a message to the server

---

### const

**Kind:** function

**Group:** Other

**Source:** `lib/utils/WebsocketProvider.tsx`

Helper function to send a simple message with a boolean, number, or string value

---

### const

**Kind:** function

**Group:** Other

**Source:** `lib/shared/Buttons/IconButton/IconButton.tsx`

This component wraps a native button element, removing native styling

---

### const

**Kind:** function

**Group:** Other

**Source:** `lib/shared/layout/habanero/MainLayout/MainLayout.tsx`

The main layout, based on Habanero with a header, footer and content area with volume on the right side.
Uses CSS grid

---

### const

**Kind:** function

**Group:** Other

**Source:** `lib/shared/MobileControlProvider/MobileControlProvider.tsx`

This needs to be wrapped around the entire app to provide the websocket context
Exposes the store and websocket context to the app
const { sendMessage } = useWebsocketContext(); will be available in any component to allow sending messages to the serverßß

---

### const

**Kind:** function

**Group:** Other

**Source:** `lib/shared/hooks/useGetDeviceStateFromRoomConfiguration.ts`

This hook will gather up all the keys for devices in the room
and  send messages to the websocket to get the iniital state
for each device

---

### const

**Kind:** function

**Group:** Other

**Source:** `lib/store/rooms/roomsSelectors.ts`

Get the display states for the room
Exludes the programAudio and codecContent destinations

---

### const

**Kind:** function

**Group:** Other

**Source:** `lib/store/devices/devicesSelectors.ts`

Selector for all devices

---

### content

**Kind:** function

**Group:** Other

**Source:** `lib/types/state/state/DeviceState.ts`

Optional object to contain message content of unknown type

---

### deleteValue

**Kind:** function

**Group:** Other

**Source:** `lib/utils/joinParamsService.ts`

Deletes a single value

---

### deleteValues

**Kind:** function

**Group:** Other

**Source:** `lib/utils/joinParamsService.ts`

Removes all MC-related values

---

### eventType

**Kind:** type

**Group:** Other

**Source:** `lib/types/state/state/DeviceState.ts`

The event type of the message for stateless messages

---

### getFormattedDate

**Kind:** function

**Group:** Other

**Source:** `lib/utils/dateTimeHelpers.ts`

Returns a medium-format date/time string, with timezone adjustment

---

### getFormattedDateFromDateString

**Kind:** function

**Group:** Other

**Source:** `lib/utils/dateTimeHelpers.ts`

Returns a medium-format date-only from a ISO date string. Does not
do time zone conversion

---

### getFormattedDateFromISO

**Kind:** function

**Group:** Other

**Source:** `lib/utils/dateTimeHelpers.ts`

Returns a medium-format date/time string, with timezone adjustment

---

### holdTimeMs

**Kind:** function

**Group:** Other

**Source:** `lib/shared/hooks/usePressHoldRelease.ts`

Defaults to 500ms

---

### iconsDictionary

**Kind:** function

**Group:** Other

**Source:** `lib/shared/Buttons/NamedIconButton/NamedIconButton.tsx`

Optional dictionary of icons to use for the button if the default is not desired.

---

### import

**Kind:** function

**Group:** Other

**Source:** `lib/types/state/state/DisplayState.ts`

Used for an individual display state

---

### key

**Kind:** function

**Group:** Other

**Source:** `lib/types/state/state/DeviceState.ts`

The key of the device

---

### messageType

**Kind:** type

**Group:** Other

**Source:** `lib/types/state/state/DeviceState.ts`

The object type of the message for state messages

---

### name

**Kind:** function

**Group:** Other

**Source:** `lib/types/state/state/DeviceState.ts`

The name of the device

---

### s

**Kind:** function

**Group:** Other

**Source:** `lib/types/state/state/DeviceState.ts`

The interfaces implmented on this instance of the device

---

### saveValue

**Kind:** function

**Group:** Other

**Source:** `lib/utils/joinParamsService.ts`

Saves a single value

---

### saveValues

**Kind:** function

**Group:** Other

**Source:** `lib/utils/joinParamsService.ts`

Saves all MC-related values

---

### state

**Kind:** function

**Group:** Other

**Source:** `lib/types/state/state/DeviceState.ts`

For future use

---

### transformDateToYearFirst

**Kind:** function

**Group:** Other

**Source:** `lib/utils/dateTimeHelpers.ts`

Sets the year-first string that the date field needs

---

### useAvrControl

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useAvrControl.ts`

Provides a set of hooks to control an AVR device

---

### useButtonHeldHeartbeat

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/useHeldButtonAction.ts`

This hook is used to return the functions to trigger for a button that can be pressed and held

#### Examples

```typescript
const path = `/device/${key}`;
// use the hook without destucturing
const numericKey = useButtonHeldHeartbeat(path, 'num0');
<button {...numericKey.digit0}>0</button>
// use the hook with destructuring
const { digit0 } = useButtonHeldHeartbeat(path, 'num0');
<button {...digit0}>0</button>
```

---

### useCameraBase

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useCameraBase.ts`

Provides a set of hooks to control a device that extends the CameraBase class

---

### useDeviceIBasicVolumeWithFeedback

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/useDeviceIBasicVolumeWithFeedback.ts`

Wrapper hook for a device volume

---

### useEffect

**Kind:** hook

**Group:** Other

**Source:** `lib/utils/WebsocketProvider.tsx`

Connect to the websocket and get the room data when the apiPath changes

---

### useEffect

**Kind:** hook

**Group:** Other

**Source:** `lib/utils/WebsocketProvider.tsx`

Send a status message to the server to get the current state of the room when the roomKey changes

---

### useEndpoint

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useEndpoint.ts`

A hook that provides access to the endpoint state

---

### useGetDevice

**Kind:** hook

**Group:** Other

**Source:** `lib/store/devices/devicesSelectors.ts`

Selector for a single device

---

### useIBasicVolumeWithFeedback

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useIBasicVolumeWithFeedback.ts`

hook to control a volume device that implements the IBasicVolumeWithFeedback interface

---

### useIChannel

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useIChannel.ts`

hook to control a channel messenger device that implements the IChannelMessenger interface

---

### useIColor

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useIColor.ts`

hook to control a device that implements the IColor interface

---

### useICommunicationMonitor

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useICommunicationMonitor.ts`

hook to control a device that implements the ICommunicationMonitor interface

---

### useIDPad

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useIDPad.ts`

hook to control a device that implements the IDPad interface

---

### useIDeviceInfoMessenger

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useIDeviceInfoMessenger.ts`

hook that returns the info for a device that implements the IDeviceInfo interface

---

### useIDspPresets

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useIDspPresets.ts`

hook to control a device that implements the IDspPresets interface

---

### useIDvr

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useIDvr.ts`

hook to control a device that implements the IDvr interface

---

### useIEssentialsRoomCombiner

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useIEssentialsRoomCombiner.ts`

hook to control a device that implements the IEssentialsRoomCombiner interface

---

### useIHasPowerControl

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useIHasPowerControl.ts`

hook to control a device that implements the IHasPowerControl interface

---

### useIHasSelectableItems

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useIHasSelectableItems.ts`

Hook for devices that have selectable items
TState is the type of the expected state of the device

---

### useIHasSurroundChannels

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useIHasSurroundChannels.ts`

hook to control a device that implements the IHasSurroundChannels interface

---

### useIHumiditySensor

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useIHumiditySensor.ts`

A hook that provides access to the humidity sensor state

---

### useILevelControls

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useILevelControls.ts`

hook that controls a device that implements the ILevelControls interface

---

### useILightingScenes

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useILightingScenes.ts`

hook to control a device that implements the ILightingScenes interface

---

### useIMatrixRouting

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useIMatrixRouting.ts`

Hook to allow routing and feedback of a matrix switcher that implements IMatrixRouting

---

### useIMcCiscoCodecUserInterfaceAppControl

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useIMcCiscoCodecUserInterfaceAppControl.ts`

hook to control a device that implements the IMcCiscoCodecUserInterfaceAppControl interface

---

### useINumeric

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useINumeric.ts`

hook to return the functions to trigger for a numeric keypad for a device that implements the INumeric interface

---

### useIProjectorScreenLiftControl

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useIProjectorScreenLiftControl.ts`

hook to control a device that implements the IProjectorScreenLiftControl interface

---

### useIRoomEventSchedule

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useIRoomEventSchedule.ts`

hook to control a device that implements the IRoomEventSchedule interface

---

### useIRunDefaultPresentRoute

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useIRunDefaultPresentRoute.ts`

hook to control a room that implements the IRunDefaultPresentRoute interface

---

### useIRunDirectRouteAction

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useIRunDirectRouteAction.ts`

---

### useIRunRouteAction

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useIRunRouteAction.ts`

hook to control a room that implements the IRunRouteAction interface

---

### useISetTopBoxControls

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useISetTopBoxcontrols.ts`

hook to control a device that implements the ISetTopBoxControls interface

---

### useIShadesOpenCloseStop

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useIShadesOpenCloseStop.ts`

hook that controls a device that implements the IShadesOpenCloseStop interface

---

### useIShutdownPromptTimer

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useIShutdownPromptTimer.ts`

hook that controls a room that implements the IShutdownPromptTimer interface

---

### useISwitchedOutput

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useISwitchedOutput.ts`

hook that controls a device that implements the ISwitchedOutput interface

---

### useITechPassword

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useITechPassword.ts`

hook that controls a room that implements the ITechPassword interface

---

### useITemperatureSensor

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useITemperatureSensor.ts`

A hook that provides access to the temperature sensor state

---

### useITheme

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useITheme.ts`

hook that controls a device that implements the ITheme interface

---

### useITransport

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useITransport.ts`

hook that controls a device that implements the ITransport interface

---

### useInitialize

**Kind:** hook

**Group:** Other

**Source:** `lib/services/apiService.ts`

Initialize the application by getting the local config data and setting it in the store

#### Returns

**Type:** `Promise<boolean>`

true if successful, false if not

---

### useMobileControlTouchpanelController

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useMobileControlTouchpanelController.ts`

hook that controls a device that implements the MobileControlTouchpanelController interface

---

### usePressHoldRelease

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/usePressHoldRelease.ts`

This hook is used to link up the functions to trigger for a button that can be pressed and held

#### Examples

```typescript
const button1 = usePressHoldRelease({
onPress: () => console.log('pressed'),
onRelease: () => console.log('released'),
onHold: () => console.log('held'),
holdTimeMs: 2000
});
// use the spread operator to attach the events to the button
<button {...button1}>Press and Hold</button>
```

---

### useRoomIBasicVolumeWithFeedback

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/useRoomIBasicVolumeWithFeedback.ts`

Wrapper hook for the room volumes

---

### useTwoWayDisplayBase

**Kind:** hook

**Group:** Other

**Source:** `lib/shared/hooks/interfaces/useTwoWayDisplayBase.ts`

Provides a set of hooks to control a device that extends the TwoWayDisplayBase class

---

### useWebsocketContext

**Kind:** hook

**Group:** Other

**Source:** `lib/utils/useWebsocketContext.ts`

A hook that provides access to the websocket for the purposes of sending messages as well as adding and removing event handlers

---

