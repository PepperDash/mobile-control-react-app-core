import axios, { AxiosError } from 'axios';
import { useAppDispatch } from '../store';
import { appConfigActions } from '../store/appConfig/appConfig.slice';
import {
  RuntimeConfigState,
  runtimeConfigActions,
} from '../store/runtimeConfig/runtimeConfig.slice';
import { uiActions } from '../store/ui/ui.slice';
import { AppConfig } from '../types/classes/app-config';

export const httpClient = axios.create();

/**
 * Builds a user-facing error message for a failed HTTP request. Axios (and
 * the browser XHR/fetch APIs underneath it) do not expose SSL/TLS
 * certificate error details to JS, so a request that fails with no response
 * (AxiosError with no `response`) is most commonly caused by an untrusted /
 * self-signed certificate on an https:// endpoint, a CSP/mixed-content
 * block, or the server being unreachable. Surface that possibility so it's
 * visible in the UI instead of only in the console.
 */
const describeRequestError = (err: unknown, url?: string): string => {
  const target =
    url ?? (err instanceof AxiosError ? err.config?.url : undefined);

  if (err instanceof AxiosError) {
    if (err.response) {
      return `Request to ${target ?? 'server'} failed: ${err.response.status} ${
        err.response.statusText
      }`;
    }

    return (
      `Network error contacting ${target ?? 'server'}: ${err.message}. ` +
      'If the URL uses https://, this is often caused by an untrusted/' +
      'self-signed SSL certificate, a CSP/mixed-content block, or the ' +
      'server being unreachable.'
    );
  }

  if (err instanceof Error) {
    return err.message;
  }

  return String(err);
};

/**
 * Initialize the application by getting the local config data and setting it in the store
 * @returns {() => Promise<boolean>} true if successful, false if not
 */
export function useInitialize(): () => Promise<boolean> {
  const dispatch = useAppDispatch();
  return async () => {
    const basePath = location.pathname
      .split('/')
      .filter((path) => path.length > 0 && !path.includes('.'));

    if (basePath.length >= 5) {
      basePath.length = 5;
    } else {
      basePath.length = 2;
    }

    const baseURL = `/${basePath.join('/')}`;
    const configUrl = `${baseURL}/_local-config/_config.local.json`;

    // Get the local config and set it in the store
    let configData: AppConfig | undefined;
    try {
      const configRes = await httpClient.get<AppConfig>(
        '/_local-config/_config.local.json',
        { baseURL }
      );

      if (configRes.status == 200 && configRes.data) {
        configData = configRes.data;
        dispatch(appConfigActions.setAppConfig(configData));
      }
    } catch (error) {
      console.error('Error getting config', error);
      dispatch(
        uiActions.setErrorMessage(describeRequestError(error, configUrl))
      );
      return false;
    }

    if (configData) {
      const apiPath = configData.apiPath;
      try {
        // Get the runtime version info an set it in the store
        const versionRes = await httpClient.get<RuntimeConfigState>(
          `${apiPath}/version`
        );
        if (versionRes.status == 200 && versionRes.data) {
          dispatch(runtimeConfigActions.setRuntimeConfig(versionRes.data));
        }
      } catch (error) {
        console.error('Error getting version info', error);
        dispatch(
          uiActions.setErrorMessage(
            describeRequestError(error, `${apiPath}/version`)
          )
        );
      }
    }

    return configData !== undefined;
  };
}
