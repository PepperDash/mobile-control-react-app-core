import { useGetDevice } from 'src/lib';
import { IHasCameraMuteState } from 'src/lib/types';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to control a device that implements the IHasCameraMute interface
 * @param key key of the device
 * @returns
 */
export function useIHasCameraMute(
  key: string,
): IHasCameraMuteProps | undefined {
  const { sendMessage } = useWebsocketContext();
  const cameraIsMuted = useGetDevice<IHasCameraMuteState>(key)?.cameraIsMuted;

  const cameraMuteOn = () => {
    sendMessage(`/device/${key}/cameraMuteOn`, null);
  };

  const cameraMuteOff = () => {
    sendMessage(`/device/${key}/cameraMuteOff`, null);
  };

  const cameraMuteToggle = () => {
    sendMessage(`/device/${key}/cameraMuteToggle`, null);
  };

  if (!cameraIsMuted) return undefined;

  return { cameraMuteOn, cameraMuteOff, cameraMuteToggle, cameraIsMuted };
}

export interface IHasCameraMuteProps {
  cameraMuteOn: () => void;
  cameraMuteOff: () => void;
  cameraMuteToggle: () => void;
  cameraIsMuted?: boolean;
}
