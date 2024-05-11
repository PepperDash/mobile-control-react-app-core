import { DeviceState } from './DeviceState';

export interface IProjectorScreenLiftControlState extends DeviceState {
  isInUpPosition?: boolean;
  displayDeviceKey?: string;
  type?: 'lift' | 'screen';
}