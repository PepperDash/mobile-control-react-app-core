import { DeviceState } from 'src/lib';

export interface ITemperatureSensorState extends DeviceState {
  temperature: string;

  temperatureInCelsius: boolean;
}