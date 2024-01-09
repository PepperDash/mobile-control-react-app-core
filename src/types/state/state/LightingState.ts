import { LightingScene } from '../environment/lightingScene.ts';
import { DeviceState } from './DeviceState.ts';

export class LightingState extends DeviceState {
  scenes: LightingScene[] = [];
}
