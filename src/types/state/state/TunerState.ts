import { DeviceState } from './DeviceState.ts';
import { PresetChannel } from './PresetChannel.ts';

export class TunerState extends DeviceState {
  favorites!: PresetChannel[];
}
