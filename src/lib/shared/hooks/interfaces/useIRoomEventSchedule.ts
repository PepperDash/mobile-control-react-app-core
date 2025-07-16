import { ScheduleEvent, ScheduleState, useRoomState } from '../../..';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';


/**
 * hook to control a device that implements the IRoomEventSchedule interface
 * @param key key of the device
 * @returns 
 */
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