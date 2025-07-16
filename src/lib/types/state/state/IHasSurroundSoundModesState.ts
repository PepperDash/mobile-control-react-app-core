import { DeviceState } from './DeviceState';
import { IHasSelectableItemsState } from './IHasSelectableItemsState';

export interface IHasSurroundSoundModesState extends DeviceState {
  surroundSoundModes: IHasSelectableItemsState;
}