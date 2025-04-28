import { DeviceState } from 'src/lib';

export interface PowerState extends DeviceState {
  powerState: boolean;
}