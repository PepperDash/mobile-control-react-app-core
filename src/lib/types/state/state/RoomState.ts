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
  isCoolingDown?: boolean;
  isInCall?: boolean;
  isOn?: boolean;
  isWarmingUp?: boolean;
  selectedSourceKey?: string;
  share?: ShareState;
  volumes?: Volumes;
}

export class RoomConfiguration {
  audioCodecKey?: string;
  defaultDisplayKey?: string;
  defaultPresentationSourceKey: string = '';
  displayKeys: string[] = [];
  environmentalDevices: EnvironmentalDeviceConfiguration[] = [];
  hasAudioConferencing?: boolean;
  hasEnvironmentalControls?: boolean;
  hasVideoConferencing?: boolean;
  helpMessage?: string;
  sourceList: Record<string, SourceListItem> = {};
  supportsAdvancedSharing?: boolean;
  uiBehavior?: EssentialsRoomUiBehaviorConfiguration;
  userCanChangeShareMode?: boolean;
  videoCodecIsZoomRoom?: boolean;
  videoCodecKey?: string;
  touchpanelKeys?: string[];
  zoomRoomControllerKey?: string;
}

export interface EssentialsRoomUiBehaviorConfiguration {
  disableActivityButtonsWhileWarmingCooling: boolean;
}

export class EnvironmentalDeviceConfiguration {
  deviceKey?: string;

  deviceType?: EnvironmentalDeviceTypes;
}

export type EnvironmentalDeviceTypes = 'Lighting' | 'Shade' | 'ShadeController';
