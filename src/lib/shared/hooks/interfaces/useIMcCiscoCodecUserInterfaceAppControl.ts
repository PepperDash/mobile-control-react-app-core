import { useWebsocketContext } from 'src/lib/utils';

export function useIMcCiscoCodecUserInterfaceAppControl(key: string) {
    const { sendMessage } = useWebsocketContext();

    const closeApp = () => {
        sendMessage(`/device/${key}/closeWebViewController`, null);
    };

    return { closeApp };
}