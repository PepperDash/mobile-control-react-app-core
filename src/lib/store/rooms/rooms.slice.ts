import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as _ from 'lodash'
import { Message } from '../../types/state/index'
import { RoomState } from '../../types/state/state/index'

const initialState: Record<string, RoomState> = {
}

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        setRoomState(state, action:PayloadAction<Message>) {
            const type = action.payload.type;

            // extract the room key from the type
            const matches = type.match('/room/(.*)/status');

            if (!matches) return;

            const key = matches[1];
            
            // This method solves the issue of multiple layers of properties
            // and avoids doing a deep copy of the object

            const content = action.payload.content as RoomState;

            // Get existing room state
            const existingState = state[key] ?? {};

            // merge new state with existing
            const newState = _.merge(existingState, content);

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
