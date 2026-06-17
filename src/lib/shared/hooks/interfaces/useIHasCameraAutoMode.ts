import { useMemo } from 'react';
import { DeviceState, useGetDevice } from '../../..';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to interact with a device that implements the IHasCameraAutoMode interface.
 * Provides camera auto mode (smart framing) state and toggle actions.
 * @param key device key
 * @returns
 */
export function useIHasCameraAutoMode(
  key: string,
): IHasCameraAutoModeReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const state = useGetDevice<IHasCameraAutoModeState>(key);

  return useMemo(() => {
    if (!state) return undefined;

    const path = `/device/${key}`;

    const cameraAutoModeOn = () =>
      sendMessage(`${path}/cameraAutoModeOn`, null);
    const cameraAutoModeOff = () =>
      sendMessage(`${path}/cameraAutoModeOff`, null);
    const cameraAutoModeToggle = () =>
      sendMessage(`${path}/cameraAutoModeToggle`, null);

    return {
      state,
      cameraAutoModeOn,
      cameraAutoModeOff,
      cameraAutoModeToggle,
    };
  }, [key, sendMessage, state]);
}

export interface IHasCameraAutoModeState extends DeviceState {
  cameraAutoModeIsOn?: boolean;
}

export interface IHasCameraAutoModeReturn {
  state: IHasCameraAutoModeState;
  cameraAutoModeOn: () => void;
  cameraAutoModeOff: () => void;
  cameraAutoModeToggle: () => void;
}
