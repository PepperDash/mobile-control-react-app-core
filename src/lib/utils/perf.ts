/**
 * Lightweight load/sync performance instrumentation.
 *
 * The library records timings and counts at the points only it can see (the connect chain, every
 * websocket message, batch requests and their completion) and hands them to whatever sinks the app
 * registers - e.g. one that forwards to Datadog RUM. With no sink registered nothing is reported,
 * so apps that don't opt in pay only for a few `performance.now()` calls and counter increments.
 *
 * Times are `performance.now()` values: milliseconds since the page's time origin, which for a
 * cold load is the navigation start - the same zero point RUM uses for the initial view.
 */

/** A completed span, e.g. "connect.join" from request to response. */
export interface PerfMeasure {
  name: string;
  /** Span start, in ms since the page's time origin. */
  startTime: number;
  /** Span length in ms. */
  duration: number;
  /** End of the span, in ms since the page's time origin (`startTime + duration`). */
  at: number;
  context?: Record<string, unknown>;
}

/** A point-in-time event with attached data, e.g. "sync.batchComplete" with message counts. */
export interface PerfEvent {
  name: string;
  /** When it happened, in ms since the page's time origin. */
  at: number;
  context?: Record<string, unknown>;
}

export interface PerfSink {
  onMeasure?: (measure: PerfMeasure) => void;
  onEvent?: (event: PerfEvent) => void;
}

const sinks = new Set<PerfSink>();
const marks = new Map<string, number>();
const counters = new Map<string, number>();

const now = (): number =>
  typeof performance !== 'undefined' && typeof performance.now === 'function'
    ? performance.now()
    : Date.now();

const notify = (fn: (sink: PerfSink) => void) => {
  sinks.forEach((sink) => {
    try {
      fn(sink);
    } catch (err) {
      // A broken sink must never break the app it is measuring.
      console.error('perf: sink error', err);
    }
  });
};

/**
 * Registers a sink to receive measures and events. Returns a function that unregisters it.
 */
export function registerPerfSink(sink: PerfSink): () => void {
  sinks.add(sink);
  return () => {
    sinks.delete(sink);
  };
}

/**
 * Records a named point in time, overwriting any earlier mark with the same name. Also writes a
 * User Timing mark so it shows up in browser dev tools' performance panel.
 */
export function perfMark(name: string): number {
  const time = now();
  marks.set(name, time);
  try {
    performance?.mark?.(name);
  } catch {
    // User Timing is optional; older panel browsers may not have it.
  }
  return time;
}

/** Returns the time of a mark, or undefined if it hasn't been set. */
export function perfGetMark(name: string): number | undefined {
  return marks.get(name);
}

/**
 * Reports the span from `start` until now (or until `end`, if given) as a measure called `name`.
 * `start` and `end` are mark names, or times in ms since the page's time origin (0 = navigation
 * start). Does nothing if a named mark was never set. Returns the measure.
 */
export function perfMeasure(
  name: string,
  start: string | number,
  end?: string | number,
  context?: Record<string, unknown>,
): PerfMeasure | undefined {
  const startTime = typeof start === 'number' ? start : marks.get(start);
  if (startTime === undefined) return undefined;

  const endTime =
    end === undefined ? now() : typeof end === 'number' ? end : marks.get(end);
  if (endTime === undefined) return undefined;

  const measure: PerfMeasure = {
    name,
    startTime,
    duration: endTime - startTime,
    at: endTime,
    context,
  };
  notify((sink) => sink.onMeasure?.(measure));
  return measure;
}

/** Reports a point-in-time event with optional data attached. */
export function perfEvent(name: string, context?: Record<string, unknown>) {
  const event: PerfEvent = { name, at: now(), context };
  notify((sink) => sink.onEvent?.(event));
}

/** Adds `by` (default 1) to a named counter. */
export function perfCount(name: string, by = 1) {
  counters.set(name, (counters.get(name) ?? 0) + by);
}

/** Current value of a counter (0 if never counted). */
export function perfGetCount(name: string): number {
  return counters.get(name) ?? 0;
}

/** Snapshot of every counter whose name starts with `prefix`. */
export function perfGetCounts(prefix = ''): Record<string, number> {
  const out: Record<string, number> = {};
  counters.forEach((value, key) => {
    if (key.startsWith(prefix)) out[key] = value;
  });
  return out;
}

/** Zeroes every counter whose name starts with `prefix`. */
export function perfResetCounts(prefix = '') {
  Array.from(counters.keys()).forEach((key) => {
    if (key.startsWith(prefix)) counters.delete(key);
  });
}

/**
 * Names used by the library. Apps can use these to build dashboards or to add their own measures
 * against the same marks (e.g. time from `marks.wsOpen` to their first usable render).
 */
export const perfNames = {
  marks: {
    configStart: 'mc.connect.config.start',
    configEnd: 'mc.connect.config.end',
    versionStart: 'mc.connect.version.start',
    versionEnd: 'mc.connect.version.end',
    joinStart: 'mc.connect.join.start',
    joinEnd: 'mc.connect.join.end',
    wsCreated: 'mc.connect.ws.created',
    wsOpen: 'mc.connect.ws.open',
    firstRoomMessage: 'mc.sync.firstRoomMessage',
    batchSent: 'mc.sync.batchSent',
    initialSyncComplete: 'mc.sync.initialSyncComplete',
  },
  measures: {
    config: 'connect.config',
    version: 'connect.version',
    join: 'connect.join',
    wsOpen: 'connect.wsOpen',
    roomState: 'sync.roomState',
    batch: 'sync.batch',
  },
  events: {
    batchComplete: 'sync.batchComplete',
  },
  counters: {
    /** Every websocket message received since the socket opened. */
    messages: 'ws.messages',
    /** Characters of websocket data received since the socket opened (~bytes for ASCII JSON). */
    bytes: 'ws.bytes',
    deviceDispatches: 'ws.deviceDispatches',
    roomDispatches: 'ws.roomDispatches',
    /** The same three, but only since the most recent batch request was sent. */
    batchMessages: 'batch.messages',
    batchBytes: 'batch.bytes',
    batchDeviceDispatches: 'batch.deviceDispatches',
  },
} as const;
