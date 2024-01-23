import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as _ from 'lodash'
import { RoomState } from '../../types/state/state/index.ts'

const initialState: Record<string, RoomState> = {
}

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        setRoomState(state, action:PayloadAction<RoomState>) {
            const key = action.payload.key;

            console.log('setRoomState', key, action.payload);
            // This method solves the issue of multiple layers of properties
            // and avoids doing a deep copy of the object

            // Get existing room state
            const existingState = state[key] ?? {};

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


export const roomsActions = roomsSlice.actions;
export const roomsReducer =  roomsSlice.reducer;
