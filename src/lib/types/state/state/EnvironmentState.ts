import { LightingScene } from '../environment/lightingScene';
import { DeviceState } from './DeviceState';
import { ShadeState } from './ShadeState';

export interface EnvironmentState extends DeviceState {

  lightingScenes: LightingScene[];

  shades: { [deviceKey: string]: ShadeState };
}
