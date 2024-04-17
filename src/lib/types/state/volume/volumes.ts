import { Volume } from './volume';

export interface Volumes {
  master: Volume;
  auxFaders: Record<string, Volume>;
}

export type RoomVolumeType = 'master' | string;

