import { ISelectableItem } from '../../interfaces/ISelectableItem';

export interface IHasSelectableItemsState {
  currentItem?: string;

  items: Record<string, ISelectableItem>;
}

