import { DeviceState } from './DeviceState';

export interface ITemperatureSensorState extends DeviceState {
  temperature: string;

  temperatureInCelsius: boolean;
}