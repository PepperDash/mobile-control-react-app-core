import { CameraState } from './CameraState.ts';

/**
 * Used for the state of all cameras for a codec
 */
export class CamerasState {
  cameraManualSupported!: boolean;

  cameraAutoSupported!: boolean;

  cameraOffSupported!: boolean;

  cameraMode!: string;

  cameraList!: unknown[]; /// ///////////////////////////////////////////

  selectedCamera?: CameraState;
}
