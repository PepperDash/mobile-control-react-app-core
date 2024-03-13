import { Volume } from '../volume/volume';
import { DeviceState } from './DeviceState';

export interface LevelControlsState extends DeviceState {
  levelControls: Record<string, Volume>
}