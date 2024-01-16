import { combineReducers } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import { appConfigReducer } from './appConfig.slice.ts';
import { roomsReducer } from './rooms.slice.ts';
import { devicesReducer } from './devices.slice.ts';
import { useDispatch } from 'react-redux';

export const rootReducer = combineReducers({})

const store = configureStore({
  reducer: {
    appConfig: appConfigReducer,
    rooms: roomsReducer,
    devices: devicesReducer,
  }
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
