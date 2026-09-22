import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { appConfigReducer } from './appConfig/appConfig.slice';
import { devicesReducer } from './devices/devices.slice';
import { createWebSocketMiddleware } from './middleware/websocketMiddleware';
import { applyReduxPlugins } from './plugins';
import { roomsReducer } from './rooms/rooms.slice';
import { runtimeConfigReducer } from './runtimeConfig/runtimeConfig.slice';
import { touchPanelReducer } from './touchPanel/touchPanel.slice';
import { uiReducer } from './ui/ui.slice';
import { webXPanelReducer } from './webXPanel/webXPanel.slice';

const rootReducer = combineReducers({
  appConfig: appConfigReducer,
  runtimeConfig: runtimeConfigReducer,
  rooms: roomsReducer,
  devices: devicesReducer,
  ui: uiReducer,
  touchPanel: touchPanelReducer,
  webXPanel: webXPanelReducer,
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

// Always wire up the touchpanel/joins (trilist) plugin so the control-system
// online/IP state and reload/mcAppUrl joins are live without requiring
// consuming apps to call applyReduxPlugins themselves.
applyReduxPlugins(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
