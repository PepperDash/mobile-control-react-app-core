import { DeviceState } from 'src/lib';

export interface ITHumiditySensorState extends DeviceState {
  humidity: string;
}