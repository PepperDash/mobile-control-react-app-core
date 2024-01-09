import { Device } from './device.ts';

export class SourceListItem {
  constructor() {
    this.includeInSourceList = true; // default to true
  }

  disableCodecSharing!: boolean;

  disableRoutedSharing!: boolean;

  key!: string;

  sourceKey!: string;

  order!: number;

  type!: string;

  icon!: string;

  sourceDevice!: Device;

  preferredName!: string;

  includeInSourceList!: boolean;

  isControllable!: boolean;

  isAudioSource!: boolean;
}
