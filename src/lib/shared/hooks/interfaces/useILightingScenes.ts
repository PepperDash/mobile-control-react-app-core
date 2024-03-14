import { useGetDevice } from 'src/lib/store';
import { LightingScene, LightingState } from 'src/lib/types';
import { useWebsocketContext } from 'src/lib/utils/useWebsocketContext';

export function useILightingScenes(key: string): ILightingScenesReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const device = useGetDevice<LightingState>(key);

  if (!device) return undefined;

  const setScene = (scene: LightingScene) => {
    sendMessage(`/device/${key}/selectScene`, scene);
  };

  return { lightingState: device, selectScene: setScene };
}

export interface ILightingScenesReturn {
  lightingState: LightingState;
  selectScene: (scene: LightingScene) => void;
}