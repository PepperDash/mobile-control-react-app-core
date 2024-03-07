
/**
 * Used for an individual display state
 */
import { Volume } from '../volume/volume';
import { DeviceState } from './DeviceState';
import { IHasCurrentSourceInfoChangeState } from './IHasCurrentSourceInfoChangeState';

export interface DisplayState extends DeviceState, IHasCurrentSourceInfoChangeState {
  hasFeedback: boolean;

  powerState: boolean;

  isWarming: boolean;

  isCooling: boolean;

  currentInput: string;

  volume?: Volume;

  inputKeys?: string[];
}
