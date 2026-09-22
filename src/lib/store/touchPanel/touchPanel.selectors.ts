import { RootState } from '../store';

export const selectControlSystem = (state: RootState) => state.touchPanel;
export const selectControlSystemOnline = (state: RootState) =>
  state.touchPanel.online;
export const selectMcAppUrl = (state: RootState) => state.touchPanel.mcAppUrl;
export const selectPanelIpAddress = (state: RootState) =>
  state.touchPanel.panelIpAddress;
