import { useAppSelector } from '../hooks';

// Temporary cast to AppConfigExtras until the data is moved to a websocket message
export const useAppConfig = () => useAppSelector((state) => state.appConfig.config);

export const useApiPath = () => useAppSelector((state) => state.appConfig.config.apiPath);

export const useLogoPath = () => useAppSelector((state) => state.appConfig.config.logoPath);

export const usePartnerMetadata = () => useAppSelector((state) => state.appConfig.config.partnerMetadata);