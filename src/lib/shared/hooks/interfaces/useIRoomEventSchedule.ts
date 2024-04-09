import { ScheduleEvent, ScheduleState, useRoomState } from 'src/lib';
import { useWebsocketContext } from 'src/lib/utils/useWebsocketContext';

export function useIRoomEventSchedule(key: string): IRoomEventScheduleReturn | undefined {
    const { sendMessage } = useWebsocketContext();
    const roomEventScheduleState = useRoomState(key) as ScheduleState | undefined;

    if (!roomEventScheduleState) return undefined;

    const save = (events: ScheduleEvent[]) => {
        sendMessage(`/room/${key}/saveScheduledEvents`, events);
    };

    return { roomEventScheduleState, save };
}

export interface IRoomEventScheduleReturn {
    roomEventScheduleState: ScheduleState;
    save: (events: ScheduleEvent[]) => void;
}