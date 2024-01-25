import { CameraState } from './CameraState';

/**
 * Used for the state of all cameras for a codec
 */
export interface CamerasState {
  cameraManualSupported: boolean;

  cameraAutoSupported: boolean;

  cameraOffSupported: boolean;

  cameraMode: string;

  cameraList: unknown[]; /// ///////////////////////////////////////////

  selectedCamera?: CameraState;
}
