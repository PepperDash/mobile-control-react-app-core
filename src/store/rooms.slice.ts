import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as _ from 'lodash'
import { DeviceState, RoomState } from '../types/state/state/index.ts'

const initialState: RoomsState = {
    rooms: {}
}

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        setRoomState(state, action:PayloadAction<DeviceState>) {
            const key = action.payload.key;

            // This method solves the issue of multiple layers of properties
            // and avoids doing a deep copy of the object

            // Get existing room state
            const existingState = state.rooms[key] ?? {};

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

interface RoomsState {
    rooms: Record<string, RoomState>;
}

export const roomsActions = roomsSlice.actions;
export const roomsReducer =  roomsSlice.reducer;
