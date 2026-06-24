import { useGetDevice } from '../../../store';
import { ICurrentSourcesState } from '../../../types/state/state/ICurrentSourcesState';

/**
 * Hook to get the current sources state of a device that implements ICurrentSources
 * @param key key of the device
 * @returns current sources state or undefined if device state hasn't loaded
 */
export function useICurrentSources(
  key: string,
): ICurrentSourcesReturn | undefined {
  const device = useGetDevice<ICurrentSourcesState>(key);

  if (!device) return undefined;

  return {
    currentSourcesState: device,
  };
}

export interface ICurrentSourcesReturn {
  currentSourcesState: ICurrentSourcesState;
}
