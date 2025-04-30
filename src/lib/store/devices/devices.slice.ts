import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as _ from 'lodash';
import { Message } from '../../types';
import { DeviceState } from '../../types/state/state';

const initialState: Record<string, DeviceState>  = {
}

const devicesSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {
        setDeviceState(state, action:PayloadAction<Message>) {
            const type = action.payload.type;
            const key = type.slice(type.lastIndexOf('/') + 1);

            if(!key) return;

            // This method solves the issue of multiple layers of properties
            // and avoids doing a deep copy of the object
            const content = action.payload.content as DeviceState;

            // Get existing room state
            const existingState = state[key] ?? {};

            // merge new state with existing
            const newState = _.merge(existingState, content);

            // overlay the incoming state properties onto the existing item
            // or create new item
            state[key] = newState;
            
            // Don't return state when using immer
        },
        clearDevices() {
            return initialState;
        },
    },
})



// Extract specific action creators to avoid exposing WritableDraft
export const devicesActions = {
  setDeviceState: devicesSlice.actions.setDeviceState,
  clearDevices: devicesSlice.actions.clearDevices
};
export const devicesReducer = devicesSlice.reducer;
