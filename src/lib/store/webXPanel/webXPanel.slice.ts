import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { WebXPanelConfigParams } from '../../services/webXPanel';

export interface IWebXPanel {
  online: boolean;
  config: Partial<WebXPanelConfigParams>;
  version: string;
  buildDate: string;
  isActive: boolean;
  wsConnected: boolean;
  /** Whether the CIP (join) session on top of the WebXPanel websocket is up. */
  cipConnected: boolean;
  /**
   * Human-readable description of the most recent WebXPanel error/warning
   * event (e.g. auth failure, websocket error, not authorized). Cleared on
   * the next successful connect. Empty string when there's no active issue.
   */
  lastError: string;
}

const initialState: IWebXPanel = {
  online: false,
  config: {},
  version: '',
  buildDate: '',
  isActive: false,
  wsConnected: false,
  cipConnected: false,
  lastError: '',
};

const webXPanelSlice = createSlice({
  name: 'webXPanel',
  initialState,
  reducers: {
    setWebXPanelOnline: (state: IWebXPanel, action: PayloadAction<boolean>) => {
      state.online = action.payload;      
    },
    setWebXPanelConfig: (
      state: IWebXPanel,
      action: PayloadAction<Partial<WebXPanelConfigParams>>
    ) => {
      state.config = action.payload;      
    },
    setWebXPanelVersion: (state: IWebXPanel, action: PayloadAction<string>) => {
      state.version = action.payload;      
    },
    setWebXPanelBuildDate: (
      state: IWebXPanel,
      action: PayloadAction<string>
    ) => {
      state.buildDate = action.payload;      
    },
    setWebXPanelIsActive: (
      state: IWebXPanel,
      action: PayloadAction<boolean>
    ) => {
      state.isActive = action.payload;      
    },
    setWebXPanelWsConnected: (
      state: IWebXPanel,
      action: PayloadAction<boolean>
    ) => {
      state.wsConnected = action.payload;      
    },
    setWebXPanelCipConnected: (
      state: IWebXPanel,
      action: PayloadAction<boolean>
    ) => {
      state.cipConnected = action.payload;      
    },
    setWebXPanelError: (state: IWebXPanel, action: PayloadAction<string>) => {
      state.lastError = action.payload;
      if (action.payload) {
        console.error(`WebXPanel Error: ${action.payload}`);
      }
    },
  },
});

export const webXPanelActions = webXPanelSlice.actions;
export const webXPanelReducer = webXPanelSlice.reducer;
