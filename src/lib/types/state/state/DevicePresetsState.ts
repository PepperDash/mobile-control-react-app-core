import { DeviceState } from './DeviceState';

export interface DevicePresetsState extends DeviceState {
  favorites: PresetChannel[];
}

export interface PresetChannel {
  name: string;
  channel: string;
  iconUrl: string;
}