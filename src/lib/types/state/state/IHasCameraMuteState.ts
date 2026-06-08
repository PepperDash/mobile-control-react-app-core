import { DeviceState } from './DeviceState';

export interface IHasCameraMuteState extends DeviceState {
  cameraIsMuted: boolean;
}
