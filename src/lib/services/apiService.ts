import axios from 'axios';
import { useAppDispatch } from '../store';
import { appConfigActions } from '../store/appConfig/appConfig.slice';
import { RuntimeConfigState, runtimeConfigActions } from '../store/runtimeConfig/runtimeConfig.slice';
import { AppConfig } from '../types/classes/app-config';

export const httpClient = axios.create();

/**
 * Initialize the application by getting the local config data and setting it in the store
 * @returns {Promise<boolean>} true if successful, false if not
 */
export function useInitialize() { 
    const dispatch = useAppDispatch();
        return async () => {
            try {
            const basePath = location.pathname.split('/').filter((path) => path.length > 0);        

            if (basePath.length >= 5) {
                basePath.length = 5;
            } else {
                basePath.length = 2;
            }        
    
            const baseURL = `/${basePath.join('/')}`;
            // Get the local config and set it in the store
            const configRes = await httpClient.get<AppConfig>('/_local-config/_config.local.json', {baseURL})

            // console.log('configRes', configRes);

            if(configRes.status == 200 && configRes.data) {


                const apiPath = configRes.data.apiPath;
                dispatch(appConfigActions.setAppConfig(configRes.data));

                // Get the runtime version info an set it in the store
                const versionRes = await httpClient.get<RuntimeConfigState>(`${apiPath}/version`);
                if (versionRes.status == 200 && versionRes.data) {
                    // console.log('versionRes', versionRes.data);
                    dispatch(runtimeConfigActions.setRuntimeConfig(versionRes.data));
                }
            }

        }
        catch (error) {
            console.error('Error getting config', error);
        }

        return true;
    }
}