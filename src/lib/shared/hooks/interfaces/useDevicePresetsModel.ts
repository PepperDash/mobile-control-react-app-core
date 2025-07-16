import { DevicePresetsState, PresetChannel, useGetDevice } from '../../..';
import { useWebsocketContext } from '../../../utils';


export function useDevicePresetsModel(key: string): DevicePresetsModelProps | undefined {
    const { sendMessage } = useWebsocketContext();
    const state = useGetDevice<DevicePresetsState>(key);
    const path = `/device/${key}`;

    if (!state) return undefined;

    const recallPreset = (deviceKey: string, preset: PresetChannel) => {
        sendMessage(`${path}/presets/recall`, {deviceKey, preset});
    }

    const savePresets = (presets: PresetChannel[]) => {
        sendMessage(`${path}/presets/save`, presets);
    }
    

    return { state, recallPreset, savePresets };
}

export interface DevicePresetsModelProps {
    state: DevicePresetsState;
    recallPreset: (deviceKey: string, preset: PresetChannel) => void;
    savePresets: (presets: PresetChannel[]) => void;
}

