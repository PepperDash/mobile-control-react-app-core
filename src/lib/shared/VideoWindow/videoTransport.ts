import { CrComLib } from '@pepperdash/ch5-crcomlib-lite';

/**
 * How {@link VideoWindow} talks to the panel.
 *
 * When the app is the page loaded on the panel, video requests and responses
 * go straight through CrComLib.
 *
 * When the app is loaded in an iframe (the touch panel wrapper app), that does
 * not work: the panel only delivers responses to the top-level page, the
 * top-level page's background covers the video, and the position of the iframe
 * on screen is unknown in here. So requests and responses are passed through
 * the parent page with `window.postMessage`, and the parent page forwards them
 * to the panel. The parent page has to run the matching relay; until it
 * answers the hello message, video is reported as not available.
 *
 * The message types below are shared with the wrapper app and must match it.
 */
const VIDEO_REQUEST = 'Csig.video.request';
const VIDEO_RESPONSE = 'Csig.video.response';

const RELAY_HELLO = 'pd-mc-video-hello';
const RELAY_READY = 'pd-mc-video-ready';
const RELAY_REQUEST = 'pd-mc-video-request';
const RELAY_RESPONSE = 'pd-mc-video-response';
const RELAY_RESET = 'pd-mc-video-reset';

type ResponseListener = (response: unknown) => void;

// Origin of the parent page, known once it has answered the hello message
let relayOrigin: string | undefined;
let listening = false;
const readyListeners = new Set<() => void>();
const responseListeners = new Set<ResponseListener>();
const resetListeners = new Set<() => void>();

const isFramed = () => window.parent !== window;

const handleMessage = (event: MessageEvent) => {
  // Only the page hosting this one may act as the relay
  if (event.source !== window.parent) {
    return;
  }

  const data = event.data;
  if (!data || typeof data !== 'object') {
    return;
  }

  if (data.type === RELAY_READY) {
    if (relayOrigin === undefined) {
      relayOrigin = event.origin;
      readyListeners.forEach((listener) => listener());
    }
    return;
  }

  if (event.origin !== relayOrigin) {
    return;
  }

  if (data.type === RELAY_RESPONSE) {
    responseListeners.forEach((listener) => listener(data.response));
  } else if (data.type === RELAY_RESET) {
    resetListeners.forEach((listener) => listener());
  }
};

const connectRelay = () => {
  if (listening) {
    return;
  }
  listening = true;
  window.addEventListener('message', handleMessage);
  // The parent's origin is not known yet. This message carries no data.
  window.parent.postMessage({ type: RELAY_HELLO }, '*');
};

/**
 * Whether video requests can be sent. Always true when the app is the
 * top-level page; in an iframe, true once the parent page's relay has answered.
 */
export const isVideoTransportReady = () =>
  !isFramed() || relayOrigin !== undefined;

/**
 * Calls `listener` when {@link isVideoTransportReady} changes. Returns a
 * function that removes the listener.
 */
export const subscribeVideoTransportReady = (listener: () => void) => {
  if (!isFramed()) {
    return () => undefined;
  }

  connectRelay();
  readyListeners.add(listener);
  return () => {
    readyListeners.delete(listener);
  };
};

export const publishVideoRequest = (request: object) => {
  if (!isFramed()) {
    CrComLib.publishEvent('o', VIDEO_REQUEST, request);
    return;
  }

  if (relayOrigin === undefined) {
    return;
  }
  // A page loaded from a file has the origin "null", which cannot be used as a
  // target, so the wildcard is the only option there.
  window.parent.postMessage(
    { type: RELAY_REQUEST, request },
    relayOrigin === 'null' ? '*' : relayOrigin
  );
};

/**
 * Calls `listener` with each video response from the panel. Returns a function
 * that removes the listener.
 */
export const subscribeVideoResponse = (listener: ResponseListener) => {
  if (!isFramed()) {
    const subscriptionId = CrComLib.subscribeState(
      'o',
      VIDEO_RESPONSE,
      listener
    );
    return () =>
      CrComLib.unsubscribeState('o', VIDEO_RESPONSE, subscriptionId);
  }

  connectRelay();
  responseListeners.add(listener);
  return () => {
    responseListeners.delete(listener);
  };
};

/**
 * Calls `listener` when the parent page has stopped every video, which it does
 * when a new page finishes loading in the iframe. A video that should still be
 * running has to be started again. Never called when the app is the top-level
 * page. Returns a function that removes the listener.
 */
export const subscribeVideoReset = (listener: () => void) => {
  if (!isFramed()) {
    return () => undefined;
  }

  connectRelay();
  resetListeners.add(listener);
  return () => {
    resetListeners.delete(listener);
  };
};
