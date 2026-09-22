import { RootState } from '../store';

export const selectWebXPanel = (state: RootState) => state.webXPanel;
export const selectWebXPanelIsActive = (state: RootState) =>
  state.webXPanel.isActive;
export const selectWebXPanelWsConnected = (state: RootState) =>
  state.webXPanel.wsConnected;
export const selectWebXPanelCipConnected = (state: RootState) =>
  state.webXPanel.cipConnected;
export const selectWebXPanelError = (state: RootState) =>
  state.webXPanel.lastError;
