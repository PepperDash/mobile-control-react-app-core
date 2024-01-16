import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DeviceState } from '../state/state/index.ts'
import * as _ from 'lodash'

const initialState: DevicesState = {
    devices: {} 
}

const devicesSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {
        setDeviceState(state, action:PayloadAction<DeviceState>) {
            const key = action.payload.key;

            // This method solves the issue of multiple layers of properties
            // and avoids doing a deep copy of the object

            // Get existing room state
            const existingState = state.devices[key] ?? {};

            // merge new state with existing
            const newState = _.merge(existingState, action.payload);

            // overlay the incoming state properties onto the existing item
            // or create new item
            return {
                ...state, [key]: newState,
            } 
        }
    },
})

interface DevicesState {
    devices: Record<string, DeviceState>;
}

export const devicesActions = devicesSlice.actions;
export const devicesReducer =  devicesSlice.reducer;
