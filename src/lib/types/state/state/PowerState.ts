import { DeviceState } from './DeviceState';

export interface PowerState extends DeviceState {
  powerState: boolean;
}