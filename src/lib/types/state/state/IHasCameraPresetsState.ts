import { DeviceState } from './DeviceState';

export interface CameraPresetItem {
  id: number;
  description: string;
  isDefined: boolean;
  isDefinable: boolean;
}

export interface IHasCameraPresetsState extends DeviceState {
  presets: CameraPresetItem[];
}
