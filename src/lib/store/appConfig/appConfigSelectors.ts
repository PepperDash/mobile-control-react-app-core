import { useAppSelector } from '../hooks';

export const useAppConfig = () => useAppSelector((state) => state.appConfig.config);

export const useApiPath = () => useAppSelector((state) => state.appConfig.config.apiPath);