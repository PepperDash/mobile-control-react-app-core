import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { useWsIsConnected } from '../../store/runtimeConfig/runtime.hooks';
import { useIsSyncStateValuePresent } from '../../store/ui/ui.hooks';
import { uiActions } from '../../store/ui/ui.slice';
import { useWebsocketContext } from '../../utils/useWebsocketContext';

/**
 * Device key -> the status action paths to request for it, e.g.
 * `{ "display-1": ["/powerStatus", "/inputStatus"], "dsp-1--program": ["/volumeStatus"] }`.
 *
 * Use the narrowest paths that cover what the UI renders: `/fullStatus` asks every messenger on the
 * device, while per-messenger paths (`/powerStatus`, `/inputStatus`, `/volumeStatus`,
 * `/commStatus`, `/deviceInfo`, ...) ask only that one. A path no messenger handles for a device is
 * skipped by the processor.
 */
export type DeviceStatusMap = Record<string, string[]>;

export interface BatchStatusRequestOptions {
  /**
   * Ask the processor to reply with ONE `/system/batchDeviceStatus` message holding every status,
   * applied to the store in a single update, instead of one message per messenger followed by
   * `/system/initialSyncComplete`. Defaults to true. Essentials builds without aggregated batch
   * support ignore it and reply the old way, so it is safe to leave on.
   */
  aggregate?: boolean;
}

let requestCounter = 0;

/** Unique enough per session to tell this client's batch replies apart. */
const nextRequestId = () => `batch-${Date.now().toString(36)}-${++requestCounter}`;

/**
 * Every (device, path) pair requested by a batch on the current connection. Once a pair has been
 * requested, the processor keeps this client's copy up to date, so asking again only repeats data
 * the store already has.
 */
const requestedPairs = new Set<string>();
const pairKey = (deviceKey: string, path: string) => `${deviceKey}\u0000${path}`;

/**
 * Present while `requestedPairs` belongs to the current connection. Every sync state is cleared when
 * the connection drops, and a new connection starts with nothing subscribed, so when this is missing
 * the registry is stale and is emptied before the next batch.
 */
const REGISTRY_SYNC_STATE = 'batch:requested';

/** The pairs in `devices` no batch has requested on this connection. */
const unrequested = (devices: DeviceStatusMap): DeviceStatusMap => {
  const missing: DeviceStatusMap = {};
  Object.entries(devices).forEach(([deviceKey, paths]) => {
    const left = paths.filter((path) => !requestedPairs.has(pairKey(deviceKey, path)));
    if (left.length > 0) missing[deviceKey] = left;
  });
  return missing;
};

function useBatchSender(
  onlyUnrequested: boolean,
  { aggregate = true }: BatchStatusRequestOptions = {},
): (devices: DeviceStatusMap) => boolean {
  const { sendMessage } = useWebsocketContext();
  const dispatch = useAppDispatch();
  const registryIsCurrent = useIsSyncStateValuePresent(REGISTRY_SYNC_STATE);
  const registryIsCurrentRef = useRef(registryIsCurrent);
  registryIsCurrentRef.current = registryIsCurrent;
  const isConnected = useWsIsConnected();
  const isConnectedRef = useRef(isConnected);
  isConnectedRef.current = isConnected;

  return useCallback(
    (devices: DeviceStatusMap) => {
      if (!registryIsCurrentRef.current) requestedPairs.clear();

      const toSend = onlyUnrequested ? unrequested(devices) : devices;
      if (Object.keys(toSend).length === 0) return false;

      sendMessage(
        '/system/batchDeviceFullStatus',
        aggregate
          ? { devices: toSend, aggregate: true, requestId: nextRequestId() }
          : { devices: toSend },
      );

      // A message sent while disconnected is dropped; don't count it as requested.
      if (!isConnectedRef.current) return true;
      Object.entries(toSend).forEach(([deviceKey, paths]) =>
        paths.forEach((path) => requestedPairs.add(pairKey(deviceKey, path))),
      );
      registryIsCurrentRef.current = true;
      dispatch(uiActions.addSyncState(REGISTRY_SYNC_STATE));
      return true;
    },
    [sendMessage, dispatch, aggregate, onlyUnrequested],
  );
}

/**
 * Returns a function that sends one `/system/batchDeviceFullStatus` request for a device map - every
 * pair given, whether or not it was requested before. Use it for the boot sync and any sync that
 * must refresh everything. `initialSyncComplete` is set once the whole batch has arrived, aggregated
 * or not.
 */
export function useSendBatchStatusRequest(
  options?: BatchStatusRequestOptions,
): (devices: DeviceStatusMap) => void {
  return useBatchSender(false, options);
}

/**
 * Like {@link useSendBatchStatusRequest}, but only requests the pairs no batch has requested on this
 * connection - nothing at all if they all have been. The returned function says whether it sent.
 */
export function useSendUnrequestedBatchStatus(
  options?: BatchStatusRequestOptions,
): (devices: DeviceStatusMap) => boolean {
  return useBatchSender(true, options);
}

/** Merges device status maps into one, without repeating a path. */
export function mergeDeviceMaps(...maps: DeviceStatusMap[]): DeviceStatusMap {
  const merged: DeviceStatusMap = {};
  maps.forEach((map) =>
    Object.entries(map).forEach(([deviceKey, paths]) => {
      merged[deviceKey] = Array.from(new Set([...(merged[deviceKey] ?? []), ...paths]));
    }),
  );
  return merged;
}

export interface DeviceStatusSyncOptions extends BatchStatusRequestOptions {
  /** Send nothing while false. Defaults to true. */
  enabled?: boolean;
}

/**
 * Requests the state a modal or page renders with one batch, instead of one request per device,
 * sending only pairs this connection hasn't requested yet. Runs again when `devices` changes,
 * sending only what is new, so a map that grows as config and room state arrive is filled in
 * without repeating earlier requests.
 *
 * Every route can be the app's entry point, so `devices` should cover everything the component's
 * children render rather than rely on what another page requested. `devices` must be memoized.
 */
export function useDeviceStatusSync(
  devices: DeviceStatusMap,
  { enabled = true, ...options }: DeviceStatusSyncOptions = {},
): void {
  const sendUnrequested = useSendUnrequestedBatchStatus(options);

  useEffect(() => {
    if (!enabled) return;
    sendUnrequested(devices);
  }, [enabled, devices, sendUnrequested]);
}
