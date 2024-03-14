import { ISelectableItem } from '../../interfaces';

export interface SurroundSoundModeState {
  currentSurroundSoundMode: string;
  surroundSoundModes: Record<string, ISelectableItem>;
}