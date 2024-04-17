import { useGetDevice } from 'src/lib/store';
import { useWebsocketContext } from 'src/lib/utils/useWebsocketContext';

/**
 * Hook for devices that have selectable items
 * TState is the type of the expected state of the device
 */
export function useIHasSelectableItems<TState>(key: string): IHasSelectableItemsReturn<TState> | undefined {
  const { sendMessage } = useWebsocketContext();
  const device = useGetDevice<TState>(key);

  console.log('deviceState', device);

  if (!device) return undefined;

  const selectItem = (itemKey: string) => {
    sendMessage(`/device/${key}/${itemKey}`, null);
  };

  return { itemsState: device, selectItem };
}

export interface IHasSelectableItemsReturn<TState> {
  itemsState: TState;
  selectItem: (itemKey: string) => void;
}