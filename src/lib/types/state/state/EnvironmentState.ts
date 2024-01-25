import { LightingScene } from '../environment/lightingScene';
import { DeviceState } from './DeviceState';
import { ShadeState } from './ShadeState';

export interface EnvironmentState extends DeviceState {
  key: string;

  name: string;

  lightingScenes: LightingScene[];

  shades: { [deviceKey: string]: ShadeState };
}
