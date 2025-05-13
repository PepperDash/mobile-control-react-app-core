import {
  CameraState,
  PressHoldReleaseReturn,
  useGetDevice,
  useWebsocketContext,
} from 'src/lib';
import { useButtonHeldHeartbeat } from '../useButtonHeldHeartbeat';

/**
 * Provides a set of hooks to control a device that extends the CameraBase class
 * @param key key of the device
 */
export function useCameraBase(key: string): CameraBaseProps | undefined {
  const { sendMessage } = useWebsocketContext();
  const path = `/device/${key}`;
  const cameraState = useGetDevice<CameraState>(key);

  const up = useButtonHeldHeartbeat(path, 'cameraUp');
  const down = useButtonHeldHeartbeat(path, 'cameraDown');
  const left = useButtonHeldHeartbeat(path, 'cameraLeft');
  const right = useButtonHeldHeartbeat(path, 'cameraRight');
  const zoomIn = useButtonHeldHeartbeat(path, 'cameraZoomIn');
  const zoomOut = useButtonHeldHeartbeat(path, 'cameraZoomOut');

  const recallPreset = (presetNumber: number) =>
    sendMessage('/camera/recallPreset', presetNumber);

  if (!cameraState) return undefined;

  return {
    state: cameraState,
    zoomIn,
    zoomOut,
    up,
    down,
    left,
    right,
    recallPreset,
  };
}

export interface CameraBaseProps {
  state: CameraState;
  zoomIn: PressHoldReleaseReturn;
  zoomOut: PressHoldReleaseReturn;
  up: PressHoldReleaseReturn;
  down: PressHoldReleaseReturn;
  left: PressHoldReleaseReturn;
  right: PressHoldReleaseReturn;
  recallPreset: (presetNumber: number) => void;
}
