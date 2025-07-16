import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * 
 * @param roomKey key of the room
 * @returns 
 */
export function useIRunDirectRouteAction(roomKey: string): IRunDirectRouteActionProps {
    const { sendMessage } = useWebsocketContext();

    const runDirectRoute = (route: DirectRoute) => {
        sendMessage(`/room/${roomKey}/directRoute`, route );
    };

    return { runDirectRoute };
}

interface IRunDirectRouteActionProps {
    runDirectRoute: (route: DirectRoute) => void;
}

interface DirectRoute {
    sourceKey: string;
    destinationKey: string;
    signalType: SignalType;
}

export type SignalType = "Audio" | "Video" | "AudioVideo" | "UsbOutput" | "UsbInput";

