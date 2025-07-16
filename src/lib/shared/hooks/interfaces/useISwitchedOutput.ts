import { useGetDevice } from '../../../store';
import { SwitchedOutputState } from '../../../types';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * hook that controls a device that implements the ISwitchedOutput interface
 * @param key key of the device
 * @returns 
 */
export function useISwitchedOutput(key: string): ISwitchedOutputReturn | undefined {
    const { sendMessage } = useWebsocketContext();
    const device = useGetDevice<SwitchedOutputState>(key);

    if (!device) return undefined;

    const on = () => {
        sendMessage(`/device/${key}/on`, null);
    };

    const off = () => {
        sendMessage(`/device/${key}/off`, null);
    };

    return { switchedOutputState: device, on, off };
}

export interface ISwitchedOutputReturn {
    switchedOutputState: SwitchedOutputState;
    on: () => void;
    off: () => void;
}