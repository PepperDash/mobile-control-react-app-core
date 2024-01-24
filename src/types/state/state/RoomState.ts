/* eslint-disable max-classes-per-file */
import { SourceListItem } from '../sourceListItem.ts';
import { Volumes } from '../volume/volumes.ts';
import { DeviceState } from './DeviceState.ts';
import { ShareState } from './ShareState.ts';

/** Base device state class */
export class RoomState extends DeviceState {
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
