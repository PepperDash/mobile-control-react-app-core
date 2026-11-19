import { CrComLib } from '@pepperdash/ch5-crcomlib-lite';
import {
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import classes from './VideoWindow.module.scss';
import { clearVideoHole, setVideoHole, VideoRect } from './videoBackdrop';
import { INVALID_URL, videoStatusMessages } from './videoStatusMessages';
import {
  isVideoTransportReady,
  publishVideoRequest,
  subscribeVideoReset,
  subscribeVideoResponse,
  subscribeVideoTransportReady,
} from './videoTransport';

/**
 * Delay before a start request is sent, so the window has settled in its final
 * position (page transitions, swipes) before the panel is told where to draw.
 */
const START_DELAY_MS = 300;

/**
 * How often the position of a running video is checked. Something else on the
 * page changing size can move the window without any event that says so.
 */
const POSITION_CHECK_MS = 250;

/**
 * The panel rejects a location that is partly off screen, so the video only
 * runs while (nearly) all of the window is visible.
 */
const VISIBLE_RATIO = 0.98;

export type VideoWindowSourceType = 'Network' | 'HDMI' | 'DM';

export type VideoWindowStatus =
  | 'unsupported'
  | 'stopped'
  | 'connecting'
  | 'buffering'
  | 'retrying'
  | 'started'
  | 'error';

interface VideoResponse {
  id?: number;
  status?: string;
  statuscode?: number;
}

const responseStatuses: Record<string, VideoWindowStatus> = {
  started: 'started',
  resized: 'started',
  stopped: 'stopped',
  connecting: 'connecting',
  buffering: 'buffering',
  retrying: 'retrying',
  error: 'error',
};

// Each window needs its own id so that it can pick its responses out of the
// shared response signal. The panel ignores an id of 0.
let nextVideoId = 1;

const isStreamUrl = (url: string) => /^(rtsp|https?):\/\//.test(url);

// Whole numbers only: the panel can return an error for fractional values.
// Every edge is rounded inward, so a window that ends at the edge of the
// screen is never reported as going past it.
const measure = (element: HTMLElement): VideoRect => {
  const rect = element.getBoundingClientRect();
  const top = Math.ceil(rect.top);
  const left = Math.ceil(rect.left);
  return {
    top,
    left,
    width: Math.max(0, Math.floor(rect.right) - left),
    height: Math.max(0, Math.floor(rect.bottom) - top),
  };
};

const sameRect = (a: VideoRect | undefined, b: VideoRect) =>
  !!a &&
  a.top === b.top &&
  a.left === b.left &&
  a.width === b.width &&
  a.height === b.height;

const parseResponse = (value: unknown): VideoResponse | undefined => {
  try {
    const response = typeof value === 'string' ? JSON.parse(value) : value;
    return response && typeof response === 'object' ? response : undefined;
  } catch {
    return undefined;
  }
};

/**
 * Shows a video stream on a Crestron touch panel (TSW, TS) or DGE.
 *
 * The browser on the panel does not decode the stream. The panel firmware
 * decodes it and draws it on a surface underneath the web page, at the position
 * of this component, and the page is made see-through there. This component
 * combines what `<ch5-video>` (start/stop/move the video) and
 * `<ch5-background>` (cut a hole in the page background) do in CH5.
 *
 * The component has no size of its own. Give it one with `className` or `style`.
 * Anything passed as children is drawn on top of the video.
 *
 * The video runs only while the window is fully on screen. On anything other
 * than a Crestron panel the status is `unsupported` and a black box is shown.
 *
 * When the app is loaded in an iframe on the panel, the page that hosts the
 * iframe has to pass the video requests on to the panel (see videoTransport.ts).
 * The touch panel wrapper app does this. Without it the status is `unsupported`.
 *
 * Any element between `<body>` and this component that has its own opaque
 * background will cover the video. Leave those transparent, or set
 * `alphaBlend={false}` to have the panel draw the video on top of the page.
 *
 * @property {string} url - Stream address (rtsp://, http:// or https://). Not used for HDMI
 * @property {VideoWindowSourceType} sourceType - Where the video comes from. Defaults to Network
 * @property {string} userId - User name for the stream, if it needs one
 * @property {string} password - Password for the stream, if it needs one
 * @property {boolean} play - Whether the video should run. Defaults to true
 * @property {boolean} alphaBlend - true (default) draws the video under the page, false draws it over the page and hides children
 * @property {boolean} manageBackground - Whether to move the page background out of the way of the video. Defaults to true
 * @property {function} onStatusChange - Called when the video status changes
 * @property {object} otherProps - Additional props to apply to the wrapping div
 */
export const VideoWindow = ({
  url = '',
  sourceType = 'Network',
  userId = '',
  password = '',
  play = true,
  alphaBlend = true,
  manageBackground = true,
  onStatusChange,
  className = '',
  children,
  ...otherProps
}: VideoWindowProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [id] = useState(() => nextVideoId++);
  const [onPanel] = useState(() => CrComLib.isCrestronTouchscreen());
  // In an iframe the video is not available until the parent page's relay
  // has answered
  const transportReady = useSyncExternalStore(
    subscribeVideoTransportReady,
    isVideoTransportReady
  );
  const supported = onPanel && transportReady;
  const [visible, setVisible] = useState(false);
  const [response, setResponse] = useState<{
    status: VideoWindowStatus;
    statusCode: number;
  }>({ status: 'stopped', statusCode: 0 });

  // Incremented to start the video again after the parent page has stopped it
  const [restarts, setRestarts] = useState(0);

  // Whether the panel has been asked to start this video and not yet to stop it
  const requestedRef = useRef(false);
  // The location most recently sent to the panel
  const rectRef = useRef<VideoRect>();
  const sourceRef = useRef({ url, sourceType, userId, password, alphaBlend });
  sourceRef.current = { url, sourceType, userId, password, alphaBlend };

  const isNetwork = sourceType === 'Network';
  const invalidUrl = isNetwork && url !== '' && !isStreamUrl(url);
  const sourceReady = !isNetwork || isStreamUrl(url);
  const active = supported && play && visible && sourceReady;

  let status: VideoWindowStatus = 'stopped';
  let statusCode = 0;
  if (!supported) {
    status = 'unsupported';
  } else if (invalidUrl) {
    status = 'error';
    statusCode = INVALID_URL;
  } else if (active) {
    ({ status, statusCode } = response);
  }
  const started = status === 'started';

  const publishLocation = useCallback(
    (action: 'start' | 'resize') => {
      if (!ref.current) {
        return;
      }
      const rect = measure(ref.current);
      const source = sourceRef.current;
      rectRef.current = rect;

      publishVideoRequest({
        action,
        id,
        credentials: { userid: source.userId, password: source.password },
        source: {
          type: source.sourceType,
          url: source.sourceType === 'HDMI' ? 'http:hdmi' : source.url,
        },
        location: { ...rect, z: 0 },
        alphablend: source.alphaBlend,
        // Same values CH5 sends. They are not real timestamps; leave them be.
        starttime: new Date().getMilliseconds(),
        endtime: new Date().getMilliseconds() + 2000,
        timing: 'linear',
      });
    },
    [id]
  );

  useEffect(() => {
    return subscribeVideoResponse((value: unknown) => {
      const videoResponse = parseResponse(value);
      // Responses for every video window arrive on the same signal, and a
      // late response can still arrive after this window has been stopped.
      if (videoResponse?.id !== id || !requestedRef.current) {
        return;
      }

      const newStatus =
        responseStatuses[videoResponse.status?.toLowerCase() ?? ''];
      if (!newStatus) {
        return;
      }
      setResponse({
        status: newStatus,
        statusCode: Number(videoResponse.statuscode ?? 0),
      });
    });
  }, [id]);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.intersectionRatio >= VISIBLE_RATIO),
      { threshold: VISIBLE_RATIO }
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Stops the video when it should no longer run, including on unmount. Kept
  // apart from the start effect so that a change of source restarts the video
  // without a stop in between.
  useEffect(() => {
    if (!active) {
      return;
    }

    const stop = () => {
      if (!requestedRef.current) {
        return;
      }
      requestedRef.current = false;
      publishVideoRequest({ action: 'stop', id });
      setResponse({ status: 'stopped', statusCode: 0 });
    };
    // A page that is reloaded or replaced never unmounts its components, and
    // the panel would keep the video running.
    window.addEventListener('pagehide', stop);

    return () => {
      window.removeEventListener('pagehide', stop);
      stop();
    };
  }, [active, id]);

  useEffect(
    () =>
      subscribeVideoReset(() => {
        if (!requestedRef.current) {
          return;
        }
        requestedRef.current = false;
        setResponse({ status: 'stopped', statusCode: 0 });
        setRestarts((count) => count + 1);
      }),
    []
  );

  // A page brought back by the browser's back or forward button can be shown
  // again as it was, still mounted, after `pagehide` stopped its video.
  useEffect(() => {
    const restart = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setRestarts((count) => count + 1);
      }
    };
    window.addEventListener('pageshow', restart);

    return () => window.removeEventListener('pageshow', restart);
  }, []);

  // Starts the video, and restarts it when the source changes. A start request
  // with the same id replaces the video that is running.
  useEffect(() => {
    if (!active) {
      return;
    }

    const timer = setTimeout(() => {
      requestedRef.current = true;
      setResponse({ status: 'connecting', statusCode: 0 });
      publishLocation('start');
    }, START_DELAY_MS);

    return () => clearTimeout(timer);
  }, [
    active,
    url,
    sourceType,
    userId,
    password,
    alphaBlend,
    restarts,
    publishLocation,
  ]);

  // While the video is running, keeps the panel's video surface and the hole
  // in the page background lined up with this element.
  useEffect(() => {
    const element = ref.current;
    if (!started || !element) {
      return;
    }

    const cutHole = alphaBlend && manageBackground;
    if (cutHole) {
      setVideoHole(id, rectRef.current ?? measure(element));
    }

    let frame = 0;
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = measure(element);
        if (sameRect(rectRef.current, rect)) {
          return;
        }
        publishLocation('resize');
        if (cutHole) {
          setVideoHole(id, rect);
        }
      });
    };

    const resizeObserver =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(sync);
    resizeObserver?.observe(element);
    window.addEventListener('resize', sync);
    // Capture phase, so scrolling inside any container is seen
    document.addEventListener('scroll', sync, true);
    const positionCheck = setInterval(sync, POSITION_CHECK_MS);
    sync();

    return () => {
      clearInterval(positionCheck);
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', sync);
      document.removeEventListener('scroll', sync, true);
      if (cutHole) {
        clearVideoHole(id);
      }
    };
  }, [started, alphaBlend, manageBackground, id, publishLocation]);

  const onStatusChangeRef = useRef(onStatusChange);
  onStatusChangeRef.current = onStatusChange;

  useEffect(() => {
    onStatusChangeRef.current?.(
      status,
      statusCode,
      videoStatusMessages[statusCode] ?? 'Unknown Error Message'
    );
  }, [status, statusCode]);

  return (
    <div
      {...otherProps}
      ref={ref}
      className={`${classes.videowindow} ${
        started && alphaBlend ? classes.showthrough : ''
      } ${className}`}
      data-video-status={status}
    >
      {children}
    </div>
  );
};

export interface VideoWindowProps extends HTMLAttributes<HTMLDivElement> {
  url?: string;
  sourceType?: VideoWindowSourceType;
  userId?: string;
  password?: string;
  play?: boolean;
  alphaBlend?: boolean;
  manageBackground?: boolean;
  onStatusChange?: (
    status: VideoWindowStatus,
    statusCode: number,
    message: string
  ) => void;
}

export default VideoWindow;
