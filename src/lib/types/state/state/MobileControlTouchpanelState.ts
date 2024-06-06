import { DeviceState } from './DeviceState';

export interface MobileControlTouchpanelState extends DeviceState, ITswAppControlMessengerState, ITswZoomControlMessengerState, IThemeMessengerState  {

}

interface ITswAppControlMessengerState {
  appOpen?: boolean;
}

interface ITswZoomControlMessengerState {
  inCall?: boolean;
  incomingCall?: boolean;
}

interface IThemeMessengerState {
  theme?: string;
}