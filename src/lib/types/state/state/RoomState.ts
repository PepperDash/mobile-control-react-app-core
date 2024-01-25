/* eslint-disable max-classes-per-file */

import { SourceListItem } from '../sourceListItem';
import { Volumes } from '../volume/volumes';
import { DeviceState } from './DeviceState';
import { ShareState } from './ShareState';

/** Base device state class */
export interface RoomState extends DeviceState {
  activityMode?: number;

  advancedSharingActive?: boolean;

  configuration?: RoomConfiguration; // update with typed class later

  isOn?: boolean;

  isInCall?: boolean;

  isWarmingUp?: boolean;

  isCoolingDown?: boolean;

  selectedSourceKey?: string;

  share?: ShareState;

  supportsAdvancedSharing?: boolean;

  userCanChangeShareMode?: boolean;

  volumes?: Volumes;
}

export class RoomConfiguration {
  hasVideoConferencing?: boolean;

  videoCodecIsZoomRoom?: boolean;

  hasAudioConferencing?: boolean;

  hasEnvironmentalControls?: boolean;

  videoCodecKey?: string;

  audioCodecKey?: string;

  defaultDisplayKey?: string;

  displayKeys: string[] = [];

  environmentalDevices: EnvironmentalDeviceConfiguration[] = [];

  sourceList: Record<string, SourceListItem> = {};

  defaultPresentationSourceKey: string = '';

  helpMessage?: string;

  uiBehavior?: EssentialsRoomUiBehaviorConfiguration;
}

export interface EssentialsRoomUiBehaviorConfiguration {
  disableActivityButtonsWhileWarmingCooling: boolean;
}

export class EnvironmentalDeviceConfiguration {
  deviceKey?: string;

  deviceType?: EnvironmentalDeviceTypes;
}

export type EnvironmentalDeviceTypes = 'Lighting' | 'Shade' | 'ShadeController';
