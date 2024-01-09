/* eslint-disable max-classes-per-file */
import { DeviceState } from './DeviceState.ts';

/**
 * Used for an individual camera state
 */
export class CameraState extends DeviceState {
  cameraManualSupported!: boolean;

  cameraAutoSupported!: boolean;

  cameraOffSupported!: boolean;

  cameraMode!: string;

  hasPresets!: boolean;

  presets!: unknown[];

  capabilities!: CameraCapabilities;

  isFarEnd: boolean = false;
}

/**
 * Describes a camera's capabilities
 */
export class CameraCapabilities {
  canPan: boolean = false;

  canTilt: boolean = false;

  canZoom: boolean = false;

  canFocus: boolean = false;
}
