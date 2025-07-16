
import { useRoomState } from '../../..';
import { IShutdownPromptTimerState } from '../../../types/state/state/IShutdownPromptTimerState';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * hook that controls a room that implements the IShutdownPromptTimer interface
 * @param roomKey key of the room
 * @returns 
 */
export function useIShutdownPromptTimer(roomKey: string): IShutdownPromptTimerReturn | undefined {
    const { sendMessage } = useWebsocketContext();
    const shutdownPromptTimerState = useRoomState(roomKey) as IShutdownPromptTimerState | undefined;

    if (!shutdownPromptTimerState) return undefined;

    const setShutdownPromptSeconds = (seconds: number) => {
        sendMessage(`/room/${roomKey}/setShutdownPromptSeconds`, seconds);
    };

    const shutdownStart = () => {
        sendMessage(`/room/${roomKey}/shutdownStart`, null);
    };

    const shutdownEnd = () => {
        sendMessage(`/room/${roomKey}/shutdownEnd`, null);
    };

    const shutdownCancel = () => {
        sendMessage(`/room/${roomKey}/shutdownCancel`, null);
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
