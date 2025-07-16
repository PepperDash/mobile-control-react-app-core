import { IconNames } from '../../shared/Icons/iconsDictionary';
import { Device } from './device';

export interface SourceListItem {
  disableCodecSharing: boolean;

  disableRoutedSharing: boolean;

  // key: string;

  sourceKey: string;

  order: number;

  type: string;

  icon: IconNames;

  sourceDevice: Device;

  name: string;

  preferredName: string;

  includeInSourceList: boolean;

  isControllable: boolean;

  isAudioSource: boolean;
}

export const roomOffSourceKey = '$off';