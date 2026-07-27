import { getWebXPanel, runsInContainerApp } from '@crestron/ch5-webxpanel';
import { CrComLib } from '@pepperdash/ch5-crcomlib-lite';
import { store } from '../../store/store';
import { webXPanelActions } from '../../store/webXPanel/webXPanel.slice';
import { requestZoomWebSocketToken } from './zoom';

/**
 * Case-insensitive lookup of a URL query param. The ZRC host appends the token
 * as lowercase `authtoken`, while other launchers may use camelCase, so param
 * names are matched without regard to case.
 */
const getParam = (qp: URLSearchParams, name: string): string | undefined => {
  const target = name.toLowerCase();
  for (const [key, value] of qp) {
    if (key.toLowerCase() === target) {
      return value;
    }
  }
  return undefined;
};

/**
 * Case-insensitive check for the `zoomRoom` URL query parameter (e.g.
 * `?zoomRoom=true`). This single param signals the app was loaded as a Zoom
 * Room Controller (ZRC) device panel — e.g. after the touchpanel wrapper app
 * navigates window.location to the MC app's join-1 URL, which carries this
 * param — and gates both `initWebXPanel()` below and `forceDeviceXPanel`,
 * since both only matter in that same ZRC context.
 */
export const isZoomRoomRequested = (): boolean => {
  try {
    const qp = new URLSearchParams(window.location.search);
    return getParam(qp, 'zoomRoom')?.toLowerCase() === 'true';
  } catch {
    // `window` may be unavailable in a non-browser context.
    return false;
  }
};

/**
 * Decides whether to force the active ("device") WebXPanel.
 *
 * When this app is hosted inside a container webview (e.g. the Zoom Room
 * Controller), `runsInContainerApp()` returns true and the library would hand
 * back the inactive WebXPanel *stub* (`isActive: false`, no-op `initialize`).
 * Forcing the active panel is only ever needed in that same ZRC context that
 * `?zoomRoom=true` signals, so this is derived from `isZoomRoomRequested()`
 * rather than a separate query param — a single `?zoomRoom=true` is enough to
 * get both the Zoom handshake and the real (non-stub) WebXPanel connection
 * working.
 */
export const forceDeviceXPanel = isZoomRoomRequested();
const isBrowser = forceDeviceXPanel || !runsInContainerApp();
const webXpanelParams = getWebXPanel(isBrowser);

const {
  WebXPanel,
  WebXPanelConfigParams,
  WebXPanelEvents,
  enableDebugging,
  setLogLevel,
  LogLevel,
} = webXpanelParams;

export type WebXPanelConfigParams = typeof WebXPanelConfigParams;

type WebXPanelConfig = Partial<WebXPanelConfigParams>;

let initialized = false;

/**
 * Reads WebXPanel connection config from the launch URL query string. Only keys
 * whose params are actually present are included, so absent values fall through
 * to the WebXPanel library defaults (e.g. `host` -> `location.hostname`,
 * `port` -> 49200) rather than being clobbered with `undefined`.
 */
const getConfigFromQuery = (): WebXPanelConfig => {
  const qp = new URLSearchParams(window.location.search);
  const config: WebXPanelConfig = {};

  const host = getParam(qp, 'host');
  if (host !== undefined) config.host = host;

  // Defaults to IP ID 5 (the app's convention) when absent, rather than the
  // WebXPanel library default of 0x03.
  config.ipId = getParam(qp, 'ipId') ?? '5';

  const roomId = getParam(qp, 'roomId');
  if (roomId !== undefined) config.roomId = roomId;

  const port = getParam(qp, 'port');
  if (port !== undefined) config.port = parseInt(port, 10);

  // Falls back to the ZRC host's lowercase `authtoken` URL param via the
  // case-insensitive lookup above.
  const authToken = getParam(qp, 'authToken');
  if (authToken !== undefined) config.authToken = authToken;

  return config;
};

/**
 * Registers WebXPanel connection lifecycle listeners for diagnostic logging.
 * The actual MC token (serial join 1 / Csig s/1) and control-system online
 * state are picked up separately via the touchpanel/joins redux plugin (see
 * store/plugins/trilist.ts), which subscribes to CrComLib joins once the CIP
 * connection established here is live.
 *
 * Also mirrors connection status and the most recent error/warning event
 * into the `webXPanel` Redux slice (see store/webXPanel/webXPanel.slice.ts)
 * so it can be surfaced on the "Connecting..." screen — this is what lets a
 * stuck "Waiting for connection token" state (no join 1 ever received) be
 * distinguished from an actual WebXPanel connection/auth failure.
 */
const registerEventListeners = (): void => {
  WebXPanel.addEventListener(WebXPanelEvents.CONNECT_WS, () => {
    console.log('WebXPanel WebSocket Connected');
    store.dispatch(webXPanelActions.setWebXPanelWsConnected(true));
    store.dispatch(webXPanelActions.setWebXPanelError(''));
  });

  WebXPanel.addEventListener(WebXPanelEvents.DISCONNECT_WS, () => {
    console.log('WebXPanel WebSocket Disconnected');
    store.dispatch(webXPanelActions.setWebXPanelWsConnected(false));
  });

  WebXPanel.addEventListener(WebXPanelEvents.ERROR_WS, () => {
    console.log('WebXPanel WebSocket Error');
    store.dispatch(
      webXPanelActions.setWebXPanelError('WebXPanel WebSocket error')
    );
  });

  WebXPanel.addEventListener(WebXPanelEvents.WEB_WORKER_FAILED, () => {
    console.log('WebXPanel Web Worker Failed');
    store.dispatch(
      webXPanelActions.setWebXPanelError('WebXPanel web worker failed to load')
    );
  });

  WebXPanel.addEventListener(WebXPanelEvents.AUTHENTICATION_FAILED, () => {
    console.log('WebXPanel Authentication Failed');
    store.dispatch(
      webXPanelActions.setWebXPanelError('WebXPanel authentication failed')
    );
  });

  WebXPanel.addEventListener(WebXPanelEvents.AUTHENTICATION_REQUIRED, () => {
    console.log('WebXPanel Authentication Required');
    store.dispatch(
      webXPanelActions.setWebXPanelError('WebXPanel authentication required')
    );
  });

  WebXPanel.addEventListener(
    WebXPanelEvents.CONNECT_CIP,
    (event: CustomEvent<{ url: string; ipId: number; roomId: string }>) => {
      const { url, ipId, roomId } = event.detail;
      console.log(
        `WebXPanel Connected to ${url}, 0x${ipId.toString(16)}, ${roomId}`
      );
      store.dispatch(webXPanelActions.setWebXPanelCipConnected(true));
      store.dispatch(webXPanelActions.setWebXPanelError(''));
    }
  );

  WebXPanel.addEventListener(
    WebXPanelEvents.DISCONNECT_CIP,
    (event: unknown) => {
      console.log(
        `WebXpanel Disconnected from CIP. Reason: ${JSON.stringify(
          event,
          null,
          2
        )}`
      );
      store.dispatch(webXPanelActions.setWebXPanelCipConnected(false));
    }
  );

  WebXPanel.addEventListener(
    WebXPanelEvents.LICENSE_WS,
    (event: CustomEvent<unknown>) => {
      console.log('WebXPanel License Info...');
      console.log(event.detail);
    }
  );

  WebXPanel.addEventListener(WebXPanelEvents.NOT_AUTHORIZED, () => {
    console.log('WebXPanel Not Authorized');
    store.dispatch(
      webXPanelActions.setWebXPanelError('WebXPanel not authorized')
    );
  });
};

/**
 * Initializes WebXPanel using config read from the launch URL. Only runs when
 * the URL has `?zoomRoom=true` (case-insensitive key), which signals the app
 * is loaded as a Zoom Room Controller (ZRC) device panel — otherwise this is a
 * no-op. Always attempts the Zoom websocket-token handshake first: in a Zoom
 * Room the ZRC host answers and supplies the token; anywhere else the
 * handshake simply times out and WebXPanel is initialized anyway (falling
 * back to its default `tokenUrl`). Registers connection-lifecycle listeners
 * that mirror status/errors into the `webXPanel` Redux slice for diagnostics
 * (see `registerEventListeners`), but otherwise has no Redux dependency.
 * Idempotent — subsequent calls are ignored — so it is safe to invoke as
 * early as possible in app startup, which matters so the Zoom handshake
 * registers its `message` listener before the host shell posts its ack.
 */
export const initWebXPanel = (): void => {
  if (initialized) {
    return;
  }

  if (!isZoomRoomRequested()) {
    return;
  }

  initialized = true;

  const config = getConfigFromQuery();
  console.log('WebXPanel config', config);

  // CrComLib is required by all apps (including non-WebXPanel/browser runs), so
  // expose it globally regardless of whether WebXPanel is active.
  window.CrComLib = CrComLib;

  // Since `forceDeviceXPanel` is derived from the same `?zoomRoom=true` param
  // that gated this function, `WebXPanel` here is always the real panel — not
  // the container stub — so both the Zoom handshake and `WebXPanel.initialize`
  // actually run.
  enableDebugging();
  setLogLevel(LogLevel.DEBUG);

  // WebXPanel is only relevant when running as a WebXPanel.
  window.WebXPanel = WebXPanel;

  console.log('[CZL] Starting Zoom token handshake');
  // Retrieve the websocket token from the Zoom shell and assign it to
  // WebXPanel before initializing, so it can authenticate. Posting
  // `ch5-zoom-lib-ready` here is also what tells the ZRC host the project has
  // loaded. When not running in a Zoom Room nothing answers, so the handshake
  // times out and WebXPanel is initialized via the `.catch` below (falling
  // back to its default `tokenUrl`). Once the CIP connection comes up, the MC
  // token itself arrives via serial join 1 (Csig s/1), handled by the
  // touchpanel/joins redux plugin (store/plugins/trilist.ts) and consumed in
  // websocketMiddleware.ts.
  requestZoomWebSocketToken(WebXPanel)
    .then(() => {
      console.log('[CZL] Zoom token retrieved successfully');
      WebXPanel.initialize(config);
    })
    .catch((error: unknown) => {
      // The handshake timed out (or otherwise failed). Initialize anyway so
      // WebXPanel falls back to fetching the token from its default tokenUrl.
      console.warn(
        '[CZL] Zoom token handshake failed; initializing WebXPanel anyway',
        error
      );
      WebXPanel.initialize(config);
    });

  registerEventListeners();
};

export { webXpanelParams };

export default initWebXPanel;
