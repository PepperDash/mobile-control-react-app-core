import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { rootReducer } from './rootReducer';

export const store = configureStore({
    reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export * from './appConfig/appConfigSelectors';
export * from './rooms/roomsSelectors';
export * from './runtimeConfig/runtimeSelectors';
export * from './ui/uiSelectors';

export * from './ui/ui.slice';
