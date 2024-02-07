import { useAppSelector } from '../hooks';

export const useShowShutdownModal = () => useAppSelector((state) => state.ui.modalVisibility['showShutdownModal']);

export const useShowIncomingCallModal = () => useAppSelector((state) => state.ui.modalVisibility['showIncomingCallModal']);

export const useShowModal = (modalType: string) => useAppSelector((state) => state.ui.modalVisibility[modalType]);
