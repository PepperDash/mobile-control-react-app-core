import { Device } from './device';

export interface Config {
  devices: Device[];
  rooms: Device[];
  sourceLists: unknown;
  destinationLists: unknown;
  tieLines: unknown[];
  info: unknown;
  runtimeInfo: unknown;
}
