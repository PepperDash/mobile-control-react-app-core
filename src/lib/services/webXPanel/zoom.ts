/**
 * Zoom Room websocket-token handshake.
 *
 * When this app is hosted inside a Zoom Room "Custom App" web view, the Zoom
 * shell brokers the WebXPanel websocket token over `window.postMessage`. This is
 * a from-scratch reimplementation of the handshake previously provided by
 * `@crestron/ch5-zoom-lib`, minus the class/singleton wrapper and the unused
 * `crComLib` argument.
 *
 * Message sequence (all payloads are JSON strings):
 *   1. app  -> parent : `ch5-zoom-lib-ready`
 *   2. parent -> app  : `ch5-zoom-lib-ready-ack` (carries the shell's origin URL)
 *   3. app  -> parent : `get-websockettoken`
 *   4. parent -> app  : `get-websockettoken-resp` (carries `webSocketToken`)
 *
 * On step 4 the token is assigned to the supplied WebXPanel object so it can
 * authenticate its CIP connection.
 */

interface WebSocketTokenTarget {
  websocketToken: string;
}

interface ZoomShellMessage {
  message: string;
  data?: string;
  webSocketToken?: string;
}

const READY = 'ch5-zoom-lib-ready';
const READY_ACK = 'ch5-zoom-lib-ready-ack';
const GET_TOKEN = 'get-websockettoken';
const GET_TOKEN_RESP = 'get-websockettoken-resp';

/**
 * Default time to wait for the shell to complete the handshake before giving up.
 * The upstream `@crestron/ch5-zoom-lib` left its own timeout stubbed out (it
 * declares a `timer` and calls `clearTimeout` but never arms it), so the promise
 * there hangs forever. Here the timeout is real: if it fires, the promise
 * rejects and the caller is expected to initialize WebXPanel anyway (which then
 * falls back to fetching the token from its default `tokenUrl`).
 */
const TOKEN_TIMEOUT_MS = 1000;

/**
 * Runs the Zoom shell handshake and assigns the retrieved websocket token to
 * `target`. Resolves once the token has been set. Rejects if the shell does not
 * complete the handshake within `timeoutMs`. Should be invoked before
 * `WebXPanel.initialize()` and as early as possible in startup so the `message`
 * listener is registered before the shell posts its ack.
 */
export const requestZoomWebSocketToken = (
  target: WebSocketTokenTarget,
  timeoutMs: number = TOKEN_TIMEOUT_MS
): Promise<void> =>
  new Promise((resolve, reject) => {
    // The origin is not known until the ack arrives; every message after the
    // ack must originate from it.
    let targetOrigin = '';

    // Tears down the listener and timer so neither leaks once the handshake
    // settles (either outcome).
    const cleanup = () => {
      clearTimeout(timer);
      window.removeEventListener('message', handleMessage);
    };

    const handleMessage = (event: MessageEvent) => {
      // Only accept messages posted by the hosting frame; anything else could
      // be spoofed by another frame/script on the page.
      if (event.source !== window.parent) {
        return;
      }

      let data: ZoomShellMessage;
      try {
        data = JSON.parse(event.data);
      } catch {
        return;
      }

      // The ack itself establishes the trusted origin, so it is exempt from the
      // origin check; everything else must match.
      if (data.message !== READY_ACK && event.origin !== targetOrigin) {
        return;
      }

      switch (data.message) {
        case READY_ACK: {
          console.log(`[CZL] received '${READY_ACK}'`);
          if (typeof data.data !== 'string') {
            console.warn(
              `[CZL] '${READY_ACK}' message missing a valid origin URL; ignoring`
            );
            break;
          }
          let url: URL;
          try {
            url = new URL(data.data);
          } catch {
            console.warn(
              `[CZL] '${READY_ACK}' message contained an invalid origin URL: ${data.data}`
            );
            break;
          }
          targetOrigin = url.origin;
          window.parent.postMessage(
            JSON.stringify({ message: GET_TOKEN }),
            targetOrigin
          );
          console.log(`[CZL] posted message '${GET_TOKEN}'`);
          break;
        }

        case GET_TOKEN_RESP: {
          console.log(`[CZL] received '${GET_TOKEN_RESP}'`);
          target.websocketToken = data.webSocketToken as string;
          console.log('[CZL] set WebXPanel websocketToken');
          cleanup();
          resolve();
          break;
        }

        default:
          break;
      }
    };

    const timer = setTimeout(() => {
      cleanup();
      reject(
        new Error(
          `[CZL] timed out after ${timeoutMs}ms waiting for '${GET_TOKEN_RESP}'`
        )
      );
    }, timeoutMs);

    window.addEventListener('message', handleMessage);

    window.parent.postMessage(JSON.stringify({ message: READY }), '*');
    console.log(`[CZL] posted message '${READY}'`);
  });

export default requestZoomWebSocketToken;
