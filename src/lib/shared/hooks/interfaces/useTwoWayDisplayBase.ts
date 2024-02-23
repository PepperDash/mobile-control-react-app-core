import { useGetDevice } from 'src/lib/store';
import { DisplayState } from 'src/lib/types';
import { IHasPowerWithFeedbackProps, useIHasPowerControl } from './useIHasPowerControl';

export function useTwoWayDisplayBase(key: string): TwoWayDisplayBaseReturn {
    const state = useGetDevice(key) as DisplayState;

    const powerControl = useIHasPowerControl(key);

    return { state, powerControl };
}

interface TwoWayDisplayBaseReturn {
  state: DisplayState;
  powerControl: IHasPowerWithFeedbackProps;
}




