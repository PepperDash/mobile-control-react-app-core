import { IKeyName } from '../../interfaces';

export interface InputsState {
  currentInputKey?: string;

  inputs: Record<string, Input>;
}

export interface Input extends IKeyName {
  isSelected: boolean;
}