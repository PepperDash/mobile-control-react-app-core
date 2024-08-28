import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AppConfigState = {
    config: {
        enableDev: false,
        apiPath: '',
        gatewayAppPath: '',
        logoPath: '',
        iconSet: 'GOOGLE',
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

/**
 * @interface
 * Contains configuration data for the MC application
 */
export interface AppConfig {
    enableDev: boolean;
    apiPath: string;
    gatewayAppPath: string;
    logoPath: string;
    iconSet: IconType;
    loginMode: string;
    modes: { [key: string]: unknown };
    partnerMetadata?: PartnerMetadata[];
  }
  
export type IconType = 'GOOGLE' | 'HABANERO' | 'NEO';

export interface PartnerMetadata {
    role: string;
    description: string;
    logoPath: string;
}


export const appConfigActions = appConfigSlice.actions;
export const appConfigReducer =  appConfigSlice.reducer;
