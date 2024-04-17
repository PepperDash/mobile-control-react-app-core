import { Volume } from '../volume/volume';

export interface IHasSurroundChannelsState {
  surroundChannels: Record<string, Volume>;
}