import { ISelectableItem } from '../../interfaces/ISelectableItem';
import { DeviceState } from './DeviceState';

export interface IHasSelectableItemsState extends DeviceState {
  currentItem?: string;

  items: Record<string, ISelectableItem>;
}
