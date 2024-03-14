import { IKeyName } from 'src/lib';

export interface ISelectableItem extends IKeyName {
  isSelected: boolean;
  name: string;
  key: string;
}