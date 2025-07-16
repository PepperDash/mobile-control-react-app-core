import { useGetDevice } from "../../../store";
import { DisplayState } from "../../../types";
import { IHasInputsState } from '../../../types/state/state/IHasInputsState';
import {
  IHasPowerWithFeedbackProps,
  useIHasPowerControl,
} from "./useIHasPowerControl";
import { IHasSelectableItemsReturn, useIHasSelectableItems } from './useIHasSelectableItems';

/**
 * Provides a set of hooks to control a device that extends the TwoWayDisplayBase class
 * @param key key of the device
 * @returns 
 */
export function useTwoWayDisplayBase(
  key: string
): TwoWayDisplayBaseReturn | undefined {
  const displayState = useGetDevice<DisplayState>(key);
  const powerControl = useIHasPowerControl(key);
  const inputControl = useIHasSelectableItems<IHasInputsState>(key);

  // bail if state is undefined
  if (!displayState) return undefined;

  const powerOnFb =
    (displayState.powerState || displayState.isWarming) &&
    !displayState.isCooling;
  const powerOffFb =
    (!displayState.powerState || displayState.isCooling) &&
    !displayState.isWarming;

  return {
    displayState,
    powerControl,
    inputControl: inputControl!,
    powerFb: { powerOnFb, powerOffFb },
  };
}

interface TwoWayDisplayBaseReturn {
  displayState: DisplayState;
  powerControl: IHasPowerWithFeedbackProps;
  inputControl: IHasSelectableItemsReturn<IHasInputsState>;
  powerFb: { powerOnFb: boolean; powerOffFb: boolean };
}
