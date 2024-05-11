import { useGetDevice } from 'src/lib/store';
import { PowerState } from 'src/lib/types';
import { IHasInputsState } from 'src/lib/types/state/state/IHasInputsState';
import { IHasSurroundSoundModesState } from 'src/lib/types/state/state/IHasSurroundSoundModesState';
import { useDeviceIBasicVolumeWithFeedback } from '../useDeviceIBasicVolumeWithFeedback';
import { IBasicVolumeWithFeedbackReturn } from './useIBasicVolumeWithFeedback';
import { IHasPowerWithFeedbackProps, useIHasPowerControl } from './useIHasPowerControl';
import { IHasSelectableItemsReturn, useIHasSelectableItems } from './useIHasSelectableItems';
import { IHasSurroundChannelsReturn, useIHasSurroundChannels } from './useIHasSurroundChannels';

export function useAvrControl(key: string): AvrReturn | undefined {
    const avrState = useGetDevice<PowerState>(key);
    const powerControl = useIHasPowerControl(key);
    const inputControl = useIHasSelectableItems<IHasInputsState>(key);
    const surroundSoundModes = useIHasSelectableItems<IHasSurroundSoundModesState>(key);
    const mainVolumeControl = useDeviceIBasicVolumeWithFeedback(key);
    const surroundChannels = useIHasSurroundChannels(key);

    if (!avrState) return undefined;

    return {
        avrState,
        powerControl,
        inputControl: inputControl!,
        surroundSoundModes: surroundSoundModes!,
        surroundChannels: surroundChannels!,
        mainVolumeControl: mainVolumeControl!
    };
}

interface AvrReturn {
    avrState: PowerState;
    powerControl: IHasPowerWithFeedbackProps;
    inputControl: IHasSelectableItemsReturn<IHasInputsState>;
    surroundSoundModes: IHasSelectableItemsReturn<IHasSurroundSoundModesState>;
    surroundChannels: IHasSurroundChannelsReturn;
    mainVolumeControl: IBasicVolumeWithFeedbackReturn;
}
