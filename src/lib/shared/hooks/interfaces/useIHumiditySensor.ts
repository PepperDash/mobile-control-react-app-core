import { useGetDevice } from '../../..';
import { ITHumiditySensorState } from '../../../types/state/state/IHumiditySensorState';

/**
 * A hook that provides access to the humidity sensor state
 * @param key the key of the temperature sensor
 * @returns 
 */
export function useIHumiditySensor(key: string): IHumiditySensorReturn | undefined {
  const state = useGetDevice<ITHumiditySensorState>(key);

  if (!state) return undefined;

  return { state};
}

export interface IHumiditySensorReturn {
  state: ITHumiditySensorState;
}