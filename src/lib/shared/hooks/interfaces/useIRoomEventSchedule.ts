import { ScheduleEvent, ScheduleState, useGetDevice } from 'src/lib';
import { useWebsocketContext } from 'src/lib/utils/useWebsocketContext';

export function useIRoomEventSchedule(key: string): IRoomEventScheduleReturn | undefined {
    const { sendMessage } = useWebsocketContext();
    const device = useGetDevice<ScheduleState>(key);

    if (!device) return undefined;

    const save = (events: ScheduleEvent[]) => {
        sendMessage(`/room/${key}/saveScheduledEvents`, events);
    };

    return { roomEventScheduleState: device, save };
}

export interface IRoomEventScheduleReturn {
    roomEventScheduleState: ScheduleState;
    save: (events: ScheduleEvent[]) => void;
}