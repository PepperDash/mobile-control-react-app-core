import { DeviceState } from './DeviceState';

export interface ShadeState extends DeviceState {
  middleButtonLabel?: string;

  isOpen?: boolean;

  isClosed?: boolean;
}
