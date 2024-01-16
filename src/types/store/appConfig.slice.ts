import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppConfigState } from './rootReducer.ts'
import { AppConfig } from '../classes/app-config.ts'

const initialState: AppConfigState = {
    config: {
        enableDev: false,
        apiPath: '',
        gatewayAppPath: '',
        logoPath: '',
        iconSet: 'HABANERO',
        loginMode: '',
        modes: {},
    }
}

const appConfigSlice = createSlice({
    name: 'appConfig',
    initialState,
    reducers: {
        setAppConfig(state, action:PayloadAction<AppConfig>) {
            state.config = action.payload;
        }
    },
})

export interface AppConfigState {
    config: AppConfig;
}

export const appConfigActions = appConfigSlice.actions;
export const appConfigReducer =  appConfigSlice.reducer;
