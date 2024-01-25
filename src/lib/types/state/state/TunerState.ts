import { DeviceState } from './DeviceState';
import { PresetChannel } from './PresetChannel';


export interface TunerState extends DeviceState {
  favorites: PresetChannel[];
}
