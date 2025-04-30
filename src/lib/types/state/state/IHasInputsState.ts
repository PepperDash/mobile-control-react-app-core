import { DeviceState } from 'src/lib';
import { IHasSelectableItemsState } from './IHasSelectableItemsState';

export interface IHasInputsState extends DeviceState {
  inputs: IHasSelectableItemsState;
}