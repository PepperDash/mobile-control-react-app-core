import { LightingScene } from '../environment/lightingScene';
import { DeviceState } from './DeviceState';


export interface LightingState extends DeviceState {
  scenes: LightingScene[];
}
