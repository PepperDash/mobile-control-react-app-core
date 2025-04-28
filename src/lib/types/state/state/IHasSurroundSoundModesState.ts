import { DeviceState } from 'src/lib';
import { IHasSelectableItemsState } from './IHasSelectableItemsState';

export interface IHasSurroundSoundModesState extends DeviceState {
  surroundSoundModes: IHasSelectableItemsState;
}