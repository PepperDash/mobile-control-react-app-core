export * from './appConfig/appConfig.hooks';
export * from './appConfig/appConfig.selectors';
export * from './devices/devices.hooks';
export * from './devices/devices.selectors';
export * from './rooms/rooms.hooks';
export * from './rooms/rooms.selectors';
export * from './runtimeConfig/runtime.hooks';
export * from './runtimeConfig/runtime.selectors';
export * from './touchPanel/touchPanel.selectors';
export * from './ui/ui.hooks';
export * from './ui/ui.selectors';
export * from './webXPanel/webXPanel.hooks';
export * from './webXPanel/webXPanel.selectors';

export * from './hooks';
export * from './ui/ui.slice';

export * from './store';

export { appConfigActions } from './appConfig/appConfig.slice';
export { devicesActions } from './devices/devices.slice';
export { roomsActions } from './rooms/rooms.slice';
export { runtimeConfigActions } from './runtimeConfig/runtimeConfig.slice';
export { touchPanelActions } from './touchPanel/touchPanel.slice';
export { webXPanelActions } from './webXPanel/webXPanel.slice';

// Export WebSocket middleware actions
export * from './middleware';
export { uiActions } from './ui/ui.slice';

// Touchpanel/joins redux plugin is applied automatically on store creation
// (see store.ts). Exported for backward compatibility — calling it again is
// a safe no-op.
export { applyReduxPlugins } from './plugins';

// Export touchpanel/WebXPanel slice types
export type { ITouchPanel } from './touchPanel/touchPanel.slice';
export type { IWebXPanel } from './webXPanel/webXPanel.slice';
