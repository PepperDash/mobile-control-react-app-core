import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { appConfigReducer } from './appConfig/appConfig.slice';
import { devicesReducer } from './devices.slice';
import { roomsReducer } from './rooms/rooms.slice';
import { runtimeConfigReducer } from './runtimeConfig/runtimeConfig.slice';
import { uiReducer } from './ui/ui.slice';

export const rootReducer = combineReducers({
  appConfig: appConfigReducer,
  runtimeConfig: runtimeConfigReducer,
  rooms: roomsReducer,
  devices: devicesReducer,
  ui: uiReducer,
})

const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;

export default store;