import { DeviceState } from './DeviceState';
import { IHasSelectableItemsState } from './IHasSelectableItemsState';

export interface IHasInputsState extends DeviceState {
  inputs: IHasSelectableItemsState;
}