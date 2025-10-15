import { useAppDispatch } from '../../store/hooks';
import { useIsSyncStateValuePresent } from '../../store/ui/ui.hooks';
import { uiActions } from '../../store/ui/ui.slice';

/**
 * Custom hook to manage synchronization state for a specific component.
 * @param name The name of the component to synchronize state for.
 * @returns [() => setSyncState, () => removeSyncState, boolean: isSynced]
 */
export function useStateIsSynced(
  name: string
): [() => void, () => void, boolean] {
  const dispatch = useAppDispatch();

  const setSyncState = () => {
    dispatch(uiActions.addSyncState(name));
  };

  const removeSyncState = () => {
    dispatch(uiActions.removeSyncState(name));
  };

  return [setSyncState, removeSyncState, useIsSyncStateValuePresent(name)];
}
