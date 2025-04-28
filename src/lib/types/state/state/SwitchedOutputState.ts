import { DeviceState } from 'src/lib';


export interface SwitchedOutputState extends DeviceState {
  isOn: boolean;
}