import { Volume } from './volume';

export interface Volumes {
  master: Volume;
  auxFaders: Record<string, Volume>;
}

// RoomVolumeType is exported from state/RoomState.ts to avoid duplication
