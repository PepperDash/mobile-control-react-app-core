import { useButtonHeldHeartbeat } from '../useButtonHeldHeartbeat';
import { PressHoldReleaseReturn } from '../usePressHoldRelease';

/**
 * hook to control a device that implements the IColor interface
 * @param key
 * @returns
 */
export function useIColor(key: string): IColorProps | undefined {
  const path = `/device/${key}`;

  const red = useButtonHeldHeartbeat(path, 'red');

  const green = useButtonHeldHeartbeat(path, 'green');

  const yellow = useButtonHeldHeartbeat(path, 'yellow');

  const blue = useButtonHeldHeartbeat(path, 'blue');

  return { red, green, yellow, blue };
}

export interface IColorProps {
  red: PressHoldReleaseReturn;
  green: PressHoldReleaseReturn;
  yellow: PressHoldReleaseReturn;
  blue: PressHoldReleaseReturn;
}
