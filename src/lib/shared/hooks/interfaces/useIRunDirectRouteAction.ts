import { useWebsocketContext } from 'src/lib/utils/useWebsocketContext';

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
}

