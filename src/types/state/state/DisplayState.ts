import { Volume } from '../volume/volume.ts';
import { DeviceState } from './DeviceState.ts';

/**
 * Used for an individual display state
 */

export class DisplayState extends DeviceState {
  hasFeedback!: boolean;

  powerState!: boolean;

  isWarming!: boolean;

  isCooling!: boolean;

  currentInput!: string;

  volume!: Volume;

  inputKeys!: string[];

  constructor() {
    super();

    this.volume = new Volume();
    this.volume.hasMute = true;
    this.volume.hasPrivacyMute = false;
  }
}
