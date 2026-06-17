import { useMemo } from 'react';
import { DeviceState, useGetDevice } from '../../..';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to interact with a device that implements IHasZoomRoomLayouts.
 * Provides layout state (available layouts, paging, content swap) and actions for
 * selecting layouts, paging through participants, and swapping content/thumbnail.
 * @param key device key
 * @returns
 */
export function useIHasZoomRoomLayouts(
  key: string,
): IHasZoomRoomLayoutsReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const state = useGetDevice<IHasZoomRoomLayoutsState>(key);

  return useMemo(() => {
    if (!state) return undefined;

    const path = `/device/${key}`;

    const selectLayout = (layout: string) =>
      sendMessage(`${path}/selectLayout`, { value: layout });

    const participantsNextPage = () =>
      sendMessage(`${path}/participantsNextPage`, null);

    const participantsPreviousPage = () =>
      sendMessage(`${path}/participantsPreviousPage`, null);

    const swapContentWithThumbnail = () =>
      sendMessage(`${path}/swapContentWithThumbnail`, null);

    return {
      state,
      selectLayout,
      participantsNextPage,
      participantsPreviousPage,
      swapContentWithThumbnail,
    };
  }, [key, sendMessage, state]);
}

export interface ZoomRoomLayoutState {
  availableLayouts?: number;
  layoutViewIsOnFirstPage?: boolean;
  layoutViewIsOnLastPage?: boolean;
  canSwapContentWithThumbnail?: boolean;
  contentSwappedWithThumbnail?: boolean;
}

export interface IHasZoomRoomLayoutsState extends DeviceState {
  layouts?: ZoomRoomLayoutState;
}

export interface IHasZoomRoomLayoutsReturn {
  state: IHasZoomRoomLayoutsState;
  selectLayout: (layout: string) => void;
  participantsNextPage: () => void;
  participantsPreviousPage: () => void;
  swapContentWithThumbnail: () => void;
}
