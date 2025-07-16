import { IKeyName, useWebsocketContext } from '../../..';

/**
 * hook to control a device that implements the IDspPresets interface
 * @param key key of the device
 * @returns 
 */
export function useIDspPresets(key: string) {
    const { sendMessage } = useWebsocketContext();

    const recallPreset = (preset: IKeyName) => {
        sendMessage(`/device/${key}/recallPreset`, preset);
    };

    return { recallPreset };
}



