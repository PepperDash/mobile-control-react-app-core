import { useGetDevice } from '../../../store';
import { LightingScene, LightingState } from '../../../types';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * hook to control a device that implements the ILightingScenes interface
 * @param key key of the device
 * @returns 
 */
export function useILightingScenes(key: string): ILightingScenesReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const state = useGetDevice<LightingState>(key);

  if (!state) return undefined;

  const setScene = (scene: LightingScene) => {
    sendMessage(`/device/${key}/selectScene`, scene);
  };

  return { lightingState: state, selectScene: setScene };
}

export interface ILightingScenesReturn {
  lightingState: LightingState;
  selectScene: (scene: LightingScene) => void;
}