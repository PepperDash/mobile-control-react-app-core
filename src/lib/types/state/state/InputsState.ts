import { ISelectableItem } from '../../interfaces/ISelectableItem';

export interface InputsState {
  currentInputKey?: string;

  inputs: Record<string, ISelectableItem>;
}

