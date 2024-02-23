import { DeviceState } from './DeviceState';

export interface MobileControlTouchpanelState extends DeviceState, ITswAppControlMessengerState, ITswZoomControlMessengerState  {

}

interface ITswAppControlMessengerState {
  appOpen?: boolean;
}

interface ITswZoomControlMessengerState {
  inCall?: boolean;
  incomingCall?: boolean;
}