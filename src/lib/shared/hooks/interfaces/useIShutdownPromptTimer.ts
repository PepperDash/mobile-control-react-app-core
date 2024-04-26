
import { useRoomState } from 'src/lib';
import { IShutdownPromptTimerState } from 'src/lib/types/state/state/IShutdownPromptTimerState';
import { useWebsocketContext } from 'src/lib/utils/useWebsocketContext';

export function useIShutdownPromptTimer(key: string): IShutdownPromptTimerReturn | undefined {
    const { sendMessage } = useWebsocketContext();
    const shutdownPromptTimerState = useRoomState(key) as IShutdownPromptTimerState | undefined;

    if (!shutdownPromptTimerState) return undefined;

    const setShutdownPromptSeconds = (seconds: number) => {
        sendMessage(`/room/${key}/setShutdownPromptSeconds`, seconds);
    };

    return { shutdownPromptTimerState, setShutdownPromptSeconds };
}

export interface IShutdownPromptTimerReturn {
    shutdownPromptTimerState: IShutdownPromptTimerState;
    setShutdownPromptSeconds: (time: number) => void;
}

