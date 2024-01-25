import { Device } from './device';

export interface SourceListItem {
  disableCodecSharing: boolean;

  disableRoutedSharing: boolean;

  key: string;

  sourceKey: string;

  order: number;

  type: string;

  icon: string;

  sourceDevice: Device;

  preferredName: string;

  includeInSourceList: boolean;

  isControllable: boolean;

  isAudioSource: boolean;
}
