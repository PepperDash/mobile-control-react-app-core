 

import { DeviceState } from './DeviceState';

/**
 * Used for an individual camera state
 */
export interface CameraState extends DeviceState {
  cameraManualSupported: boolean;

  cameraAutoSupported: boolean;

  cameraOffSupported: boolean;

  cameraMode: string;

  hasPresets: boolean;

  presets: unknown[];

  capabilities: CameraCapabilities;

  isFarEnd: boolean;
}

/**
 * Describes a camera's capabilities
 */
export interface CameraCapabilities {
  canPan: boolean;

  canTilt: boolean;

  canZoom: boolean;

  canFocus: boolean;
}
