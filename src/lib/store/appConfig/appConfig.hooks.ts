import { useAppSelector } from '../hooks';
import { selectApiPath, selectAppConfig, selectLogoPath, selectPartnerMetadata } from './appConfig.selectors';

// Temporary cast to AppConfigExtras until the data is moved to a websocket message
export const useAppConfig = () => useAppSelector(selectAppConfig);

export const useApiPath = () => useAppSelector(selectApiPath);

export const useLogoPath = () => useAppSelector(selectLogoPath);

export const usePartnerMetadata = () => useAppSelector(selectPartnerMetadata)