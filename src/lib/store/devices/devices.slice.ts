import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as _ from 'lodash';
import { Message } from '../../types';
import { DeviceState } from '../../types/state/state';

const initialState: Record<string, DeviceState> = {};

/**
 * Merges one device status message into the devices state (an Immer draft). Partial updates: a
 * null/undefined incoming value means "no change", and arrays are replaced rather than merged.
 */
function mergeDeviceMessage(
  state: Record<string, DeviceState>,
  message: Message,
): void {
  const type = message.type;
  const key = type.slice(type.lastIndexOf('/') + 1);

  if (!key) return;

  // This method solves the issue of multiple layers of properties
  // and avoids doing a deep copy of the object
  const content = message.content as DeviceState;

  // Get existing device state
  const existingState = state[key] ?? {};

  // merge new state with existing (replace arrays instead of merging them)
  const newState = _.mergeWith(
    {},
    existingState,
    content,
    (objValue, srcValue) => {
      // Partial updates: a null/undefined incoming value means "no change", so keep the
      // existing value instead of letting the default merge overwrite it (lodash skips
      // undefined but overwrites with null).
      if (srcValue == null) return objValue;
      if (Array.isArray(srcValue)) return srcValue.slice();
      return undefined; // fallback to default merge behavior
    },
  );

  // overlay the incoming state properties onto the existing item
  // or create new item
  state[key] = newState;
}

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setDeviceState(state, action: PayloadAction<Message>) {
      mergeDeviceMessage(state, action.payload);
      // Don't return state when using immer
    },
    /**
     * Applies many device status messages, in order, as one store update - e.g. an aggregated
     * batch status reply - so subscribers re-render once rather than once per message.
     */
    setManyDeviceStates(state, action: PayloadAction<Message[]>) {
      action.payload.forEach((message) => mergeDeviceMessage(state, message));
    },
    clearDevices() {
      return initialState;
    },
  },
});

// Extract specific action creators to avoid exposing WritableDraft
export const devicesActions = {
  setDeviceState: devicesSlice.actions.setDeviceState,
  setManyDeviceStates: devicesSlice.actions.setManyDeviceStates,
  clearDevices: devicesSlice.actions.clearDevices,
};
export const devicesReducer = devicesSlice.reducer;
