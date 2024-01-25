
/**
 * Used for an individual display state
 */
import { Volume } from '../volume/volume';
import { DeviceState } from './DeviceState';

export interface DisplayState extends DeviceState {
  hasFeedback: boolean;

  powerState: boolean;

  isWarming: boolean;

  isCooling: boolean;

  currentInput: string;

  volume: Volume;

  inputKeys: string[];
}
