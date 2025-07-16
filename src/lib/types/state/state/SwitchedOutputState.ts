import { DeviceState } from './DeviceState';


export interface SwitchedOutputState extends DeviceState {
  isOn: boolean;
}