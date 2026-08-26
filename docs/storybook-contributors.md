# Storybook Support — Contributor Notes

**Relates to:** [Issue #98](https://github.com/PepperDash/mobile-control-react-app-core/issues/98) · [Document Mobile Control data flow #89](https://github.com/PepperDash/mobile-control-react-app-core/issues/89)

This library does not currently have Storybook configured, and it doesn't need to in order for app developers to use Storybook in *their own* app repo — see [storybook-app-dev.md](./storybook-app-dev.md) for that workflow. This note covers what's missing on the library side to make that workflow clean, in case someone picks it up.

---

## The gap: reducers aren't exported

App-dev stories need to build a mock Redux store (a plain `configureStore`, not the library's singleton `store`, since that one concats `createWebSocketMiddleware()` and will try to connect). That means they need the individual slice reducers.

Each slice file exports its reducer (`devicesReducer`, `roomsReducer`, `runtimeConfigReducer`, `appConfigReducer`, `uiReducer`), but the public barrel `src/lib/store/index.ts` only re-exports:

```ts
export { appConfigActions } from './appConfig/appConfig.slice';
export { devicesActions } from './devices/devices.slice';
export { roomsActions } from './rooms/rooms.slice';
export { runtimeConfigActions } from './runtimeConfig/runtimeConfig.slice';
// ...
export { uiActions } from './ui/ui.slice';
export * from './ui/ui.slice'; // only slice with a reducer wildcard-exported
```

So `devicesReducer`, `roomsReducer`, `runtimeConfigReducer`, and `appConfigReducer` are not part of the package's public API. A consuming app can't `import { devicesReducer } from 'mobile-control-react-app-core'` — only `ui`'s reducer happens to leak through today, incidentally, via its wildcard export.

### Suggested fix

Add explicit reducer exports alongside the existing action exports in `src/lib/store/index.ts`:

```ts
export { devicesReducer } from './devices/devices.slice';
export { roomsReducer } from './rooms/rooms.slice';
export { runtimeConfigReducer } from './runtimeConfig/runtimeConfig.slice';
export { appConfigReducer } from './appConfig/appConfig.slice';
```

Or, better for consumers, export a small factory that assembles a store with no WebSocket middleware — the same shape as the app-dev doc's `createMockStore`, just owned by the library instead of copy-pasted into every app:

```ts
// src/lib/testing/createMockStore.ts
import { configureStore } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { appConfigReducer } from '../store/appConfig/appConfig.slice';
import { devicesReducer } from '../store/devices/devices.slice';
import { roomsReducer } from '../store/rooms/rooms.slice';
import { runtimeConfigReducer } from '../store/runtimeConfig/runtimeConfig.slice';
import { uiReducer } from '../store/ui/ui.slice';

export const createMockStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: {
      appConfig: appConfigReducer,
      runtimeConfig: runtimeConfigReducer,
      rooms: roomsReducer,
      devices: devicesReducer,
      ui: uiReducer,
    },
    preloadedState,
  });
```

Exporting this from the library (e.g. as `mobile-control-react-app-core/testing`) means app developers never have to hand-assemble the reducer map themselves, and it stays in sync automatically if a new slice is added.

---

## Not needed: a mock `WebsocketContext` provider

No action required here. `WebsocketContext` (`src/lib/utils/WebsocketContext.ts`) already has safe no-op defaults for every function it carries. Components that call `useWebsocketContext()` for commands work in Storybook with no provider at all — only state *reads* (Redux store) need mocking. Don't add a Storybook-specific websocket mock; it would just duplicate what the context default already does.

---

## Optional: Storybook for this library's own components

Separately from unblocking app-dev usage, this repo's own shared components (`src/lib/shared/Buttons`, `src/lib/shared/Icons`, `src/lib/shared/layout/habanero`, etc.) have no Storybook of their own. Adding `.storybook/` here (via `@storybook/react-vite`, matching the app's Vite 6 setup) would let contributors iterate on those components visually without building a consuming app first. This is a separate, lower-priority effort from the reducer-export gap above — the app-dev workflow doesn't depend on it.
