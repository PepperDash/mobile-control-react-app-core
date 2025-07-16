import { useWebsocketContext } from '../../../utils';

/**
 * hook to control a device that implements the IMcCiscoCodecUserInterfaceAppControl interface
 * @param key key of the device
 * @returns 
 */
export function useIMcCiscoCodecUserInterfaceAppControl(key: string) {
    const { sendMessage } = useWebsocketContext();

    const closeApp = () => {
        sendMessage(`/device/${key}/closeWebViewController`, null);
    };

    return { closeApp };
}