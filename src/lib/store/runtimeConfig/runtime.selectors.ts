import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../..';


const runtimeState = (state: RootState) => state.runtimeConfig;

export const selectWsIsConnected = createSelector(
  runtimeState,
  (state) => state.websocket.isConnected
);

export const selectRoomKey = createSelector(
  runtimeState,
  (state) => state.currentRoomKey
);

export const selectClientId = createSelector(
  runtimeState,
  (state) => state.roomData.clientId
);

export const selectSystemUuid = createSelector(
  runtimeState,
  (state) => state.roomData.systemUuid
);

export const selectUserCode = createSelector(
  runtimeState,
  (state) => state.roomData.userCode
);

export const selectServerIsRunningOnProcessorHardware = createSelector(
  runtimeState,
  (state) => state.serverIsRunningOnProcessorHardware
);

export const selectRuntimeInfo = createSelector(
  runtimeState,
  (state) => state.roomData.config?.runtimeInfo
);

export const selectTouchpanelKey = createSelector(
  runtimeState,
  (state) => state.touchpanelKey
);

export const selectIsTouchpanel = createSelector(
  runtimeState,
  (state) => state.touchpanelKey !== ''
);