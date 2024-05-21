/* eslint-disable max-classes-per-file */

import { DestinationListItem } from '../DestinationListItem';
import { LevelControlListItem } from '../LevelControlListItem';
import { SourceListItem } from '../sourceListItem';
import { Volume } from '../volume/volume';
import { DeviceState } from './DeviceState';
import { ScheduleEvent } from './ScheduleEvent';
import { ShareState } from './ShareState';

/** Base device state class */
export interface RoomState extends DeviceState{
  activityMode?: number;
  advancedSharingActive?: boolean;
  configuration?: RoomConfiguration; // update with typed class later
  isCoolingDown?: boolean;
  isInCall?: boolean;
  isOn?: boolean;
  isWarmingUp?: boolean;
  selectedSourceKey?: string;
  share?: ShareState;
  volumes : Record<string, Volume>;
  scheduleEvents: ScheduleEvent[];
}

export interface RoomConfiguration {
  accessoryDeviceKeys?: string[];
  audioCodecKey?: string;
  ciscoNavigatorKey?: string;
  defaultDisplayKey?: string;
  defaultPresentationSourceKey: string;
  destinationList: Record<string, DestinationListItem>;
  destinations: Record<DestinationTypes, string>;
  endpointKeys?: string[];
  environmentalDevices: EnvironmentalDeviceConfiguration[];
  hasAudioConferencing?: boolean;
  hasEnvironmentalControls?: boolean;
  hasVideoConferencing?: boolean;
  helpMessage?: string;
  levelControlList: Record<string, LevelControlListItem>;
  matrixRoutingKey?: string;
  roomCombinerKey?: string;
  sourceList: Record<string, SourceListItem>;
  supportsAdvancedSharing?: boolean;
  techPassword?: string;
  touchpanelKeys?: string[];
  uiBehavior?: EssentialsRoomUiBehaviorConfiguration;
  userCanChangeShareMode?: boolean;
  videoCodecIsZoomRoom?: boolean;
  videoCodecKey?: string;
  zoomRoomControllerKey?: string;
}

export interface EssentialsRoomUiBehaviorConfiguration {
  disableActivityButtonsWhileWarmingCooling: boolean;
}

export class EnvironmentalDeviceConfiguration {
  deviceKey?: string;

  deviceType?: EnvironmentalDeviceTypes;
}

export class AccessoryDeviceConfiguration {
  deviceKey?: string;
  deviceType?: AccessoryDeviceTypes;
}

export type AccessoryDeviceTypes = 'Camera' | 'ProjectorLift' | 'Screen';

export type EnvironmentalDeviceTypes = 'Lighting' | 'Shade' | 'ShadeController' | 'Relay';

export type RoomVolumeType = 'master' | string;

export type DestinationTypes =   "defaultDisplay" | "leftDisplay" | "centerDisplay" | "rightDisplay" | "programAudio" | "codecContent";


