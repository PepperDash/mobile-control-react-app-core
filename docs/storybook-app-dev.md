# HOW TO: Use Storybook to Develop React Apps Against Mock Data

**Relates to:** [Issue #98](https://github.com/PepperDash/mobile-control-react-app-core/issues/98) · [Document Mobile Control data flow #89](https://github.com/PepperDash/mobile-control-react-app-core/issues/89)

> **Storybook is not yet configured in this repository or in `mobile-control-react-app-core`.** This guide establishes the pattern for setting it up in an app that consumes the library, so you can build UI without a running Essentials program, plugins, or a Crestron processor. See [storybook-contributors.md](./storybook-contributors.md) for the library-side gap this pattern runs into and what would remove it.

---

## Why

The library's UI is almost entirely data-driven — what renders is determined by state pushed from [Essentials](https://github.com/PepperDash/Essentials) over WebSocket (see [redux-state-app-dev.md](./redux-state-app-dev.md)). Without Storybook, seeing what a component looks like normally means standing up a full Essentials program, plugins, and config just to get data flowing. Storybook lets you skip all of that:

- Build and review components in isolation, with mock data you control.
- Work on the frontend in parallel with backend/plugin development, once you've agreed on the shape of the state.
- Recreate real device/room state (captured from an actual session) to reproduce and fix rendering bugs without reconnecting to that hardware.

---

## Install Storybook

If your app doesn't already have Storybook, follow the official setup for a Vite + React project: <https://storybook.js.org/docs/get-started/frameworks/react-vite>

This adds a `.storybook/` config folder and a `storybook` script to `package.json`.

---

## Case 1 — Components That Only Take Props

If a component has no dependency on the Redux store or `useWebsocketContext` — it only reads `props` — write a story directly with no extra setup.

```tsx
// SelectButton.tsx
interface SelectButtonProps {
  isSelected?: boolean;
  onClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

const SelectButton = ({ isSelected, onClick, disabled, children }: SelectButtonProps) => (
  <button
    className={`btn ${isSelected ? 'btn-primary-selected' : 'btn-primary'}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default SelectButton;
```

```tsx
// SelectButton.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import SelectButton from './SelectButton';

export default {
  component: SelectButton,
  parameters: { layout: 'fullscreen' },
} as Meta<typeof SelectButton>;

type Story = StoryObj<typeof SelectButton>;

export const Default: Story = {
  render: () => <SelectButton onClick={() => console.log('clicked')}>Label</SelectButton>,
};

export const Selected: Story = {
  render: () => (
    <SelectButton isSelected onClick={() => console.log('clicked')}>Selected</SelectButton>
  ),
};

export const Disabled: Story = {
  render: () => (
    <SelectButton disabled onClick={() => console.log('clicked')}>Disabled</SelectButton>
  ),
};
```

Run `npm run storybook` to view it.

---

## Case 2 — Components That Read From the Redux Store

Most components in a real app don't take device/room state as props — they read it from the store via selector hooks (`useGetDevice`, `useRoomState`, etc., see [redux-state-app-dev.md](./redux-state-app-dev.md)). To render one of these in Storybook, the story needs to (1) wrap the component in a Redux `Provider`, and (2) seed that store with state, before the component mounts.

### Do not use `MobileControlProvider` in stories

`MobileControlProvider` wraps its children in `WebsocketProvider`, which dispatches `wsConnect()` on mount and renders a `DisconnectedMessage` until the connection succeeds (`src/lib/shared/MobileControlProvider/MobileControlProvider.tsx`, `src/lib/utils/WebsocketProvider.tsx`). In Storybook there is nothing to connect to, so the component would never render.

You don't need it anyway: `useWebsocketContext()` reads from `WebsocketContext`, which has safe no-op defaults (`sendMessage`, `sendSimpleMessage`, etc. all resolve to `() => null` — see `src/lib/utils/WebsocketContext.ts`). Any component or interface hook that only *sends* commands (e.g. `useIHasPowerControl`) renders and is clickable in Storybook with zero setup — the click just goes nowhere, which is fine for visual/interaction development.

### Build a mock store per story

Use a plain `Provider` from `react-redux` around a fresh `configureStore` — never the library's exported singleton `store` (it concats the WebSocket middleware and will attempt a real connection). Combine only the slice reducers you need for the component under test.

```tsx
// mockStore.ts
import { configureStore } from '@reduxjs/toolkit';
import { devicesReducer, roomsReducer } from 'mobile-control-react-app-core'; // see note below

export const createMockStore = () =>
  configureStore({
    reducer: {
      devices: devicesReducer,
      rooms: roomsReducer,
    },
  });
```

> **Note:** as of this writing, `devicesReducer` / `roomsReducer` are not part of the library's public export surface (`src/lib/store/index.ts` only re-exports the action creators and hooks, not the reducers — see [storybook-contributors.md](./storybook-contributors.md)). Until that's added, define equivalent local reducers in your app, or deep-import from the package's build output as a stopgap.

### Seed the store the same way Essentials would

The WebSocket middleware, on a real connection, dispatches `devicesActions.setDeviceState({ type: '/device/<key>', content })` and `roomsActions.setRoomState({ type: '/room/<key>', content })` as messages arrive (`src/lib/store/middleware/websocketMiddleware.ts`). Both action creators are already exported from the library, so a story can dispatch the exact same actions to make the store look like Essentials populated it:

```tsx
// DisplayStatus.stories.tsx
import { Provider } from 'react-redux';
import { Meta, StoryObj } from '@storybook/react';
import { devicesActions } from 'mobile-control-react-app-core';
import { createMockStore } from './mockStore';
import DisplayStatus from './DisplayStatus';

export default {
  component: DisplayStatus,
  decorators: [
    (Story) => {
      const store = createMockStore();

      // Same action, same shape, the WS middleware would dispatch on a real message
      store.dispatch(
        devicesActions.setDeviceState({
          type: '/device/display-1',
          content: { powerState: true },
        }),
      );

      return <Provider store={store}><Story /></Provider>;
    },
  ],
} as Meta<typeof DisplayStatus>;

type Story = StoryObj<typeof DisplayStatus>;

export const PoweredOn: Story = {
  args: { deviceKey: 'display-1' },
};
```

The device key is parsed out of the `type` path (`type.slice(type.lastIndexOf('/') + 1)`), and `content` is deep-merged into any existing state for that key with `lodash.mergeWith` — arrays are replaced, not merged (`src/lib/store/devices/devices.slice.ts`). That means you can dispatch multiple partial updates in sequence to build up state incrementally, exactly like Essentials does over a live session.

Room state works the same way with `roomsActions.setRoomState({ type: '/room/<roomKey>', content })`.

---

## Case 3 — Replaying a Captured Real Session

To reproduce a specific real-world scenario (a bug report, an edge-case device configuration), capture the sequence of state messages from a real Essentials-connected session and replay them as store actions.

1. **Capture:** temporarily log every dispatched `setDeviceState` / `setRoomState` action from a running app connected to real Essentials (e.g., a Redux middleware that appends `action` to an array, or the Redux DevTools action log exported as JSON).
2. **Save** the captured array as a fixture, e.g. `fixtures/conference-room-in-call.json` — an ordered list of `{ type, content }` messages.
3. **Replay** it into the mock store before rendering the story:

```tsx
import fixture from '../fixtures/conference-room-in-call.json';
import { devicesActions, roomsActions } from 'mobile-control-react-app-core';

const store = createMockStore();

fixture.forEach((message: { type: string; content: unknown }) => {
  if (message.type.startsWith('/device/')) {
    store.dispatch(devicesActions.setDeviceState(message));
  } else if (message.type.startsWith('/room/')) {
    store.dispatch(roomsActions.setRoomState(message));
  }
});
```

Because state merges incrementally in the same order the real middleware applies it, replaying the captured messages in order reproduces the same final store shape the live session had — without needing to reconnect to that room or device.

---

## Summary

| Component depends on…                              | What the story needs                                                                                                      |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Only `props`                                       | Nothing extra — render directly.                                                                                          |
| `useWebsocketContext` (commands only)              | Nothing extra — the context's no-op defaults make buttons safely clickable.                                               |
| Redux store (`useGetDevice`, `useRoomState`, etc.) | A `Provider` wrapping a fresh `configureStore`, seeded via `devicesActions.setDeviceState` / `roomsActions.setRoomState`. |
| A specific real-world scenario                     | The same store setup, seeded by replaying a captured sequence of state messages.                                          |

Never wrap a story in `MobileControlProvider` or the real exported `store` — both assume (and attempt) a live WebSocket connection.
