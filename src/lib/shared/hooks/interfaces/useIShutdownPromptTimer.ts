
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

    const shutdownStart = () => {
        sendMessage(`/room/${key}/shutdownStart`, null);
    };

    const shutdownEnd = () => {
        sendMessage(`/room/${key}/shutdownEnd`, null);
    };

    const shutdownCancel = () => {
        sendMessage(`/room/${key}/shutdownCancel`, null);
    };

    return { shutdownPromptTimerState, setShutdownPromptSeconds, shutdownStart, shutdownEnd, shutdownCancel};
}

export interface IShutdownPromptTimerReturn {
    shutdownPromptTimerState: IShutdownPromptTimerState;
    setShutdownPromptSeconds: (time: number) => void;
    shutdownStart: () => void;
    shutdownEnd: () => void;
    shutdownCancel: () => void;
}

export type IShutdownPromptTimerEventTypes = 'timerStarted' | 'timerFinished' | 'timerCancelled';
