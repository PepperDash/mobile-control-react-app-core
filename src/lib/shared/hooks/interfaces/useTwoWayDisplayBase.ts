import { useGetDevice } from "src/lib/store";
import { DisplayState } from "src/lib/types";
import { IHasInputsState } from 'src/lib/types/state/state/IHasInputsState';
import {
  IHasPowerWithFeedbackProps,
  useIHasPowerControl,
} from "./useIHasPowerControl";
import { IHasSelectableItemsReturn, useIHasSelectableItems } from './useIHasSelectableItems';


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
