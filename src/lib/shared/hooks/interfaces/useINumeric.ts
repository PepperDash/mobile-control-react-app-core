import { useButtonHeldHeartbeat } from '../useButtonHeldHeartbeat';
import { PressHoldReleaseReturn } from '../usePressHoldRelease';

/**
 * hook to return the functions to trigger for a numeric keypad for a device that implements the INumeric interface
 * @param key device key
 * @returns
 */
export function useINumeric(key: string): INumericProps {
  const path = `/device/${key}`;

  const digit0 = useButtonHeldHeartbeat(path, 'num0');

  const digit1 = useButtonHeldHeartbeat(path, 'num1');

  const digit2 = useButtonHeldHeartbeat(path, 'num2');

  const digit3 = useButtonHeldHeartbeat(path, 'num3');

  const digit4 = useButtonHeldHeartbeat(path, 'num4');

  const digit5 = useButtonHeldHeartbeat(path, 'num5');

  const digit6 = useButtonHeldHeartbeat(path, 'num6');

  const digit7 = useButtonHeldHeartbeat(path, 'num7');

  const digit8 = useButtonHeldHeartbeat(path, 'num8');

  const digit9 = useButtonHeldHeartbeat(path, 'num9');

  const keypadAccessoryButton1 = useButtonHeldHeartbeat(path, 'numDash');

  const keypadAccessoryButton2 = useButtonHeldHeartbeat(path, 'numEnter');

  return {
    digit0,
    digit1,
    digit2,
    digit3,
    digit4,
    digit5,
    digit6,
    digit7,
    digit8,
    digit9,
    keypadAccessoryButton1,
    keypadAccessoryButton2,
  };
}

export interface INumericProps {
  digit0: PressHoldReleaseReturn;
  digit1: PressHoldReleaseReturn;
  digit2: PressHoldReleaseReturn;
  digit3: PressHoldReleaseReturn;
  digit4: PressHoldReleaseReturn;
  digit5: PressHoldReleaseReturn;
  digit6: PressHoldReleaseReturn;
  digit7: PressHoldReleaseReturn;
  digit8: PressHoldReleaseReturn;
  digit9: PressHoldReleaseReturn;
  keypadAccessoryButton1: PressHoldReleaseReturn;
  keypadAccessoryButton2: PressHoldReleaseReturn;
}
