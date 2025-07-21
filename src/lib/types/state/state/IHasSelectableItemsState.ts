import { DeviceState } from '../..';
import { ISelectableItem } from '../../interfaces/ISelectableItem';

export interface IHasSelectableItemsState extends DeviceState {
  currentItem?: string;

  items: Record<string, ISelectableItem>;
}
