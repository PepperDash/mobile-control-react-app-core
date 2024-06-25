import { useAppSelector } from '../hooks';

export const useShowShutdownModal = () => useAppSelector((state) => state.ui.modalVisibility['showShutdownModal']);

export const useShowIncomingCallModal = () => useAppSelector((state) => state.ui.modalVisibility['showIncomingCallModal']);

export const useShowModal = (modalType: string) => useAppSelector((state) => state.ui.modalVisibility[modalType]);

export const useGetCurrentPopoverIdForGroup = (popoverGroup: string) => useAppSelector((state) => {
 // get the first popover id whose value is true in the group
 const popover = state.ui.popoverVisibility[popoverGroup];
 if (!popover) {
   return undefined;
 } else {
    return Object.keys(popover).find((key) => popover[key]);
  }  
});

export const useShowPopoverById = (popoverGroup: string, popoverId: string) => useAppSelector((state) => state.ui.popoverVisibility[popoverGroup]?.[popoverId]);

export const useError = () => useAppSelector((state) => state.ui.error);

export const useShowReconnect = () => useAppSelector((state) => state.ui.showReconnect);

export const useTheme = () => useAppSelector((state) => state.ui.theme);
