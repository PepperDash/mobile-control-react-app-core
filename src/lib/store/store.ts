import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { appConfigReducer } from './appConfig/appConfig.slice';
import { devicesReducer } from './devices/devices.slice';
import { createWebSocketMiddleware } from './middleware/websocketMiddleware';
import { roomsReducer } from './rooms/rooms.slice';
import { runtimeConfigReducer } from './runtimeConfig/runtimeConfig.slice';
import { uiReducer } from './ui/ui.slice';

const rootReducer = combineReducers({
  appConfig: appConfigReducer,
  runtimeConfig: runtimeConfigReducer,
  rooms: roomsReducer,
  devices: devicesReducer,
  ui: uiReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore WebSocket actions with callbacks
        ignoredActions: ['websocket/addEventHandler'],
      },
    }).concat(createWebSocketMiddleware()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
