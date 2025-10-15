import { CameraState } from './CameraState';
import { DeviceState } from './DeviceState';

/**
 * Used for the state of all cameras for a codec
 */
export interface IHasCamerasState extends DeviceState {
  // cameraManualSupported: boolean;

  // cameraAutoSupported: boolean;

  // cameraOffSupported: boolean;

  // cameraMode: string;

  cameraList: CameraState[];

  selectedCamera?: CameraState;
}
