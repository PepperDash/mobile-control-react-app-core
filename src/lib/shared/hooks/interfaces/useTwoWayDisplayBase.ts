import { useGetDevice } from "src/lib/store";
import { DisplayState } from "src/lib/types";
import {
  IHasPowerWithFeedbackProps,
  useIHasPowerControl,
} from "./useIHasPowerControl";


export function useTwoWayDisplayBase(
  key: string
): TwoWayDisplayBaseReturn | undefined {
  const displayState = useGetDevice<DisplayState>(key);
  const powerControl = useIHasPowerControl(key);

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
    powerFb: { powerOnFb, powerOffFb },
  };
}

interface TwoWayDisplayBaseReturn {
  displayState: DisplayState;
  powerControl: IHasPowerWithFeedbackProps;
  powerFb: { powerOnFb: boolean; powerOffFb: boolean };
}
