import { IKeyName } from '.';

export interface ISelectableItem extends IKeyName {
  isSelected: boolean;
}