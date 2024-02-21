import { Volume } from './volume';

export interface Volumes {
  master: Volume;
  auxFaders: Record<string, Volume>;
  // numberOfAuxFaders: number;
}
