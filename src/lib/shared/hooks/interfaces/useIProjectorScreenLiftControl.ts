import { IProjectorScreenLiftControlState, useGetDevice, useWebsocketContext } from 'src/lib';


export function useIProjectorScreenLiftControl(key: string): IProjectorScreenLiftControlReturn | undefined {
    const { sendMessage } = useWebsocketContext();
    const projectorScreenLiftControlState = useGetDevice(key) as IProjectorScreenLiftControlState | undefined;

    if (!projectorScreenLiftControlState) return undefined;

    const raise = () => {
        sendMessage(`/device/${key}/raise`, null);
    };

    const lower = () => {
      sendMessage(`/device/${key}/lower`, null);
  };

    return { projectorScreenLiftControlState, raise, lower };
}

export interface IProjectorScreenLiftControlReturn {
    projectorScreenLiftControlState: IProjectorScreenLiftControlState;
    raise: () => void;
    lower: () => void;
}