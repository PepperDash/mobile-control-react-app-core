import { Device } from './device.ts';

export interface Config {
  devices: Device[];
  rooms: Device[];
  sourceLists: unknown;
  destinationLists: unknown;
  tieLines: unknown[];
  info: unknown;
  runtimeInfo: unknown;
}
