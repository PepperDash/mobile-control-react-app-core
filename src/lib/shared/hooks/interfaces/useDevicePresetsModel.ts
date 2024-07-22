import { DevicePresetsState, PresetChannel, useGetDevice } from 'src/lib';
import { useWebsocketContext } from 'src/lib/utils';


export function useIDevicePresetsModel(key: string): IDevicePresetsModelProps | undefined {
    const { sendMessage } = useWebsocketContext();
    const state = useGetDevice<DevicePresetsState>(key);
    const path = `/device/${key}`;

    if (!state) return undefined;

    const recallPreset = (deviceKey: string, preset: PresetChannel) => {
        sendMessage(`${path}/recall`, {deviceKey, preset});
    }

    const savePresets = (presets: PresetChannel[]) => {
        sendMessage(`${path}/save`, presets);
    }
    

    return { state, recallPreset, savePresets };
}

export interface IDevicePresetsModelProps {
    state: DevicePresetsState;
    recallPreset: (deviceKey: string, preset: PresetChannel) => void;
    savePresets: (presets: PresetChannel[]) => void;
}

