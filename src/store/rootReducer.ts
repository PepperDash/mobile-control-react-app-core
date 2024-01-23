import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { appConfigReducer } from './appConfig.slice.ts';
import { devicesReducer } from './devices.slice.ts';
import { roomsReducer } from './rooms/rooms.slice.ts';
import { runtimeConfigReducer } from './runtimeConfig/runtimeConfig.slice.ts';

export const rootReducer = combineReducers({
  appConfig: appConfigReducer,
  runtimeConfig: runtimeConfigReducer,
  rooms: roomsReducer,
  devices: devicesReducer,
})

const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;


