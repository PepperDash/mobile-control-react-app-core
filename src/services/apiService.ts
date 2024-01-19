import axios from 'axios';
import * as localConfig from '../../_local-config/_config.local.json';
import { appConfigActions } from '../store/appConfig.slice.ts';
import store from '../store/rootReducer.ts';
import { RuntimeConfigState, runtimeConfigActions } from '../store/runtimeConfig.slice.ts';
import { AppConfig } from '../types/classes/app-config.ts';

export const httpClient = axios.create();

export async function initialize() { 
    try {
        // Get the local config and set it in the store
        //const configRes = await httpClient.get<AppConfig>('./_local-config/_config.local.json')

        // temporary hardcoded config
        const configRes = {
            status: 200,
            data: localConfig.default as AppConfig
        };


        if(configRes.status == 200 && configRes.data) {
            const apiPath = configRes.data.apiPath;
            store.dispatch(appConfigActions.setAppConfig(configRes.data));

            // Get the runtime version info an set it in the store
            const versionRes = await httpClient.get<RuntimeConfigState>(`${apiPath}/version`);
            if (versionRes.status == 200 && versionRes.data) {
                console.log('versionRes', versionRes.data);
                store.dispatch(runtimeConfigActions.setRuntimeConfig(versionRes.data));
            }
        }

    }
    catch (error) {
        console.log('Error getting config', error);
    }
}