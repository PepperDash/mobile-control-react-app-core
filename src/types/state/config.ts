import { Device } from './device.ts';

export interface Config {
  devices: Device[];
  rooms: unknown[];
  sourceLists: unknown;
  destinationLists: unknown;
  tieLines: unknown[];
  info: unknown;
  runtimeInfo: unknown;
}
