import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoomData } from '../types/index.ts';

const initialState: RuntimeConfigState = {
    apiVersion: '',
    serverIsRunningOnProcessorHardware: undefined,
    websocket: {
        isConnected: false,
    },
    pluginVersion: '',
    disconnectionMessage: '',
    token: '',
    roomData: {
        clientId: '',
        roomKey: '',
        systemUuid: '',
        roomUuid: '',
        userAppUrl: '',
        config: undefined,
        userCode: ''
    },
}

const runtimeConfigSlice = createSlice({
    name: 'runtimeConfig',
    initialState,
    reducers: {
        setRuntimeConfig(state, action: PayloadAction<RuntimeConfigState>) {
            state.apiVersion = action.payload.apiVersion;
            state.serverIsRunningOnProcessorHardware = action.payload.serverIsRunningOnProcessorHardware;
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
        }
    }
})

export interface RuntimeConfigState {
    apiVersion: string;
    serverIsRunningOnProcessorHardware: boolean | undefined;
    websocket: {
        isConnected: boolean;
    }
    pluginVersion: string;
    disconnectionMessage: string;
    token: string;
    roomData: RoomData;
}

export const runtimeConfigActions = runtimeConfigSlice.actions;
export const runtimeConfigReducer = runtimeConfigSlice.reducer;