import { useAppSelector } from '../hooks';
import { selectCurrentPopoverIdForGroup, selectError, selectModalVisibility, selectShowPopoverById, selectShowReconnect, selectTheme } from './ui.selectors';

export const useShowShutdownModal = () => useAppSelector(selectModalVisibility('showShutdownModal'));

export const useShowIncomingCallModal = () => useAppSelector(selectModalVisibility('showIncomingCallModal'));

export const useShowModal = (modalType: string) => useAppSelector(selectModalVisibility(modalType));

export const useGetCurrentPopoverIdForGroup = (popoverGroup: string) => useAppSelector(selectCurrentPopoverIdForGroup(popoverGroup));

export const useShowPopoverById = (popoverGroup: string, popoverId: string) => useAppSelector(selectShowPopoverById(popoverGroup, popoverId));

export const useError = () => useAppSelector(selectError);

export const useShowReconnect = () => useAppSelector(selectShowReconnect);

export const useTheme = () => useAppSelector(selectTheme);
