import { useAppSelector } from '../hooks';
import {
  selectWebXPanel,
  selectWebXPanelCipConnected,
  selectWebXPanelError,
  selectWebXPanelIsActive,
  selectWebXPanelWsConnected,
} from './webXPanel.selectors';

export const useWebXPanel = () => useAppSelector(selectWebXPanel);

export const useWebXPanelIsActive = () =>
  useAppSelector(selectWebXPanelIsActive);

export const useWebXPanelWsConnected = () =>
  useAppSelector(selectWebXPanelWsConnected);

export const useWebXPanelCipConnected = () =>
  useAppSelector(selectWebXPanelCipConnected);

export const useWebXPanelError = () => useAppSelector(selectWebXPanelError);
