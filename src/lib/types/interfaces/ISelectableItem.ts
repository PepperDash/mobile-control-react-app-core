import { IKeyName } from 'src/lib';

export interface ISelectableItem extends IKeyName {
  isSelected: boolean;
  Name: string;
  Key: string;
}