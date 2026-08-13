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

    const setVideoOrder = (value: string) =>
      sendMessage(`${path}/setVideoOrder`, { value });

    const setThumbnailsPosition = (value: string) =>
      sendMessage(`${path}/setThumbnailsPosition`, { value });

    return {
      state,
      selectLayout,
      participantsNextPage,
      participantsPreviousPage,
      swapContentWithThumbnail,
      setVideoOrder,
      setThumbnailsPosition,
    };
  }, [key, sendMessage, state]);
}

export interface LayoutOption {
  command: string;
  label: string;
}

export interface ZoomRoomLayoutState {
  availableLayouts?: LayoutOption[];
  layoutViewIsOnFirstPage?: boolean;
  layoutViewIsOnLastPage?: boolean;
  canSwapContentWithThumbnail?: boolean;
  contentSwappedWithThumbnail?: boolean;
  videoOrder?: string;
  availableVideoOrders?: LayoutOption[];
  thumbnailsPosition?: string;
  availableThumbnailsPositions?: LayoutOption[];
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
  setVideoOrder: (value: string) => void;
  setThumbnailsPosition: (value: string) => void;
}
