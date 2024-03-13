import { useGetDevice } from 'src/lib/store';
import { PowerState } from 'src/lib/types';
import { IHasInputsReturn, useIHasInputs } from './useIHasInputs';
import { IHasPowerWithFeedbackProps, useIHasPowerControl } from './useIHasPowerControl';




export function useAvrControl(key: string): AvrReturn | undefined {
    const avrState = useGetDevice<PowerState>(key);
    const powerControl = useIHasPowerControl(key);
    const inputControl = useIHasInputs(key);

    if (!avrState) return undefined;

    return {
        avrState,
        powerControl,
        inputControl: inputControl!,
    };
}

interface AvrReturn {
    avrState: PowerState;
    powerControl: IHasPowerWithFeedbackProps;
    inputControl: IHasInputsReturn;
}

