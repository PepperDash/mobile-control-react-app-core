import { createSelector } from '@reduxjs/toolkit';
import { AppConfigExtras, RootState } from '../..';


const appConfigSlice = (state: RootState) => state.appConfig;

export const selectAppConfig = createSelector(
  appConfigSlice,
  (appConfig) => appConfig.config as AppConfigExtras
);

export const selectApiPath = createSelector(
  appConfigSlice,
  (appConfig) => appConfig.config.apiPath
);

export const selectLogoPath = createSelector(
  appConfigSlice,
  (appConfig) => appConfig.config.logoPath
);

export const selectPartnerMetadata = createSelector(
  appConfigSlice,
  (appConfig) => appConfig.config.partnerMetadata
);