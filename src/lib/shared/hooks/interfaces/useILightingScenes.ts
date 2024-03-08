import { useGetDevice } from 'src/lib/store';
import { LightingState } from 'src/lib/types';
import { useWebsocketContext } from 'src/lib/utils/useWebsocketContext';

export function useILightingScenes(key: string): ILightingScenesReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const device = useGetDevice<LightingState>(key);

  if (!device) return undefined;

  const setScene = (scene: string) => {
    sendMessage(`/device/${key}/scene`, scene);
  };

  return { lightingState: device, selectScene: setScene };
}

export interface ILightingScenesReturn {
  lightingState: LightingState;
  selectScene: (scene: string) => void;
}