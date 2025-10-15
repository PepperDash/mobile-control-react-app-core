import { IHasCamerasState, useGetDevice, useWebsocketContext } from '../../../';

export function useIHasCameras(key: string): IHasCamerasReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const path = `/device/${key}`;
  const cameraState = useGetDevice<IHasCamerasState>(key);

  if (!cameraState) return undefined;

  const selectCamera = (cameraKey: string) => {
    sendMessage(`${path}/selectCamera`, cameraKey);
  };

  return {
    state: cameraState,
    selectCamera,
  };
}

export interface IHasCamerasReturn {
  state: IHasCamerasState;
  selectCamera: (cameraKey: string) => void;
}
