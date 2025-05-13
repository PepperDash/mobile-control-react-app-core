 

import { PresetListItem } from '..';
import { CameraListItem } from '../CameraListItem';
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
  audioControlPointList: AudioControlPointListItem;
  cameraList?: Record<string, CameraListItem>;
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

export interface EnvironmentalDeviceConfiguration {
  deviceKey?: string;

  deviceType?: EnvironmentalDeviceTypes;
}

export interface AccessoryDeviceConfiguration {
  deviceKey?: string;
  deviceType?: AccessoryDeviceTypes;
}

export interface AudioControlPointListItem {
  levelControls: Record<string, LevelControlListItem>;
  presets: Record<string, PresetListItem>;
}

export type AccessoryDeviceTypes = 'Camera' | 'ProjectorLift' | 'Screen';

export type EnvironmentalDeviceTypes = 'Lighting' | 'Shade' | 'ShadeController' | 'Relay';

export type RoomVolumeType = 'master' | string;

export type DestinationTypes =   "defaultDisplay" | "leftDisplay" | "centerDisplay" | "rightDisplay" | "programAudio" | "codecContent";


