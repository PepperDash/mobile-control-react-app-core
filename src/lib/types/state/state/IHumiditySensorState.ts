import { DeviceState } from './DeviceState';

export interface ITHumiditySensorState extends DeviceState {
  humidity: string;
}