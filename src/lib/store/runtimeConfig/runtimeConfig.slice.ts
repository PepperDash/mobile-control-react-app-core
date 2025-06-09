import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoomData } from '../../types/index';

const initialState: RuntimeConfigState = {
  apiVersion: '',
  serverIsRunningOnProcessorHardware: false,
  websocket: {
    isConnected: undefined,
  },
  pluginVersion: '',
  disconnectionMessage: '',
  token: '',
  currentRoomKey: '',
  touchpanelKey: '',
  roomData: {
    clientId: '',
    roomKey: '',
    systemUuid: '',
    roomUuid: '',
    userAppUrl: '',
    config: {
      runtimeInfo: {
        pluginVersion: '',
        essentialsVersion: '',
        pepperDashCoreVersion: '',
        essentialsPlugins: [],
      },
      rooms: [],
      devices: [],
    },
    userCode: '',
    qrUrl: '',
  },
};

const runtimeConfigSlice = createSlice({
  name: 'runtimeConfig',
  initialState,
  reducers: {
    setRuntimeConfig(state, action: PayloadAction<RuntimeConfigState>) {
      state.apiVersion = action.payload.apiVersion;
      state.serverIsRunningOnProcessorHardware =
        action.payload.serverIsRunningOnProcessorHardware;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setWebsocketIsConnected(state, action: PayloadAction<boolean>) {
      state.websocket.isConnected = action.payload;
    },
    setPluginVersion(state, action: PayloadAction<string>) {
      state.pluginVersion = action.payload;
    },
    setRoomData(state, action: PayloadAction<RoomData>) {
      state.roomData = action.payload;
    },
    setCurrentRoomKey(state, action: PayloadAction<string>) {
      // clear out any existing room/device data
      state.currentRoomKey = action.payload;
    },
    setUserCode(state, action: PayloadAction<UserCode>) {
      state.roomData.userCode = action.payload.userCode;
      state.roomData.qrUrl = action.payload.qrUrl;
    },
    setTouchpanelKey(state, action: PayloadAction<string>) {
      state.touchpanelKey = action.payload;
    },
  },
});

export interface RuntimeConfigState {
  apiVersion: string;
  serverIsRunningOnProcessorHardware: boolean | undefined;
  websocket: {
    isConnected?: boolean;
  };
  pluginVersion: string;
  disconnectionMessage: string;
  token: string;
  roomData: RoomData;
  currentRoomKey: string;
  touchpanelKey: string;
}

export interface UserCode {
  userCode: string;
  qrUrl: string;
}

export const runtimeConfigActions = runtimeConfigSlice.actions;
export const runtimeConfigReducer = runtimeConfigSlice.reducer;
