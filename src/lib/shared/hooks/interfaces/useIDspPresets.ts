import { IKeyName, useWebsocketContext } from 'src/lib';

export function useIDspPresets(key: string) {
    const { sendMessage } = useWebsocketContext();

    const recallPreset = (preset: IKeyName) => {
        sendMessage(`/device/${key}/recallPreset`, preset);
    };

    return { recallPreset };
}



