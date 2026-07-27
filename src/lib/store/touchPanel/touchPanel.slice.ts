import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITouchPanel {
  online: boolean;
  mcAppUrl: string;
  panelIpAddress: string;
}

const initialState: ITouchPanel = {
  online: false,
  mcAppUrl: '',
  panelIpAddress: '',
};

const touchPanelSlice = createSlice({
  name: 'touchPanel',
  initialState,
  reducers: {
    setControlSystemOnline: (state, action: PayloadAction<boolean>) => {
      state.online = action.payload;
      console.log(`Control System ${state.online ? 'online' : 'offline'}`);
    },
    setMcAppUrl: (state, action: PayloadAction<string>) => {
      state.mcAppUrl = action.payload;
    },
    setPanelIpAddress: (state, action: PayloadAction<string>) => {
      state.panelIpAddress = action.payload;
    },
  },
});

export const touchPanelActions = touchPanelSlice.actions;
export const touchPanelReducer = touchPanelSlice.reducer;
