import { LightingScene } from '../environment/lightingScene.ts';
import { CommMonitorState } from './CommMonitorState.ts';
import { DeviceState } from './DeviceState.ts';
import { ShadeState } from './ShadeState.ts';

export class EnvironmentState extends DeviceState {
  key: string = '';

  name: string = '';

  commMonitor?: CommMonitorState;

  lightingScenes: LightingScene[] = [];

  shades: { [deviceKey: string]: ShadeState } = {};
}
