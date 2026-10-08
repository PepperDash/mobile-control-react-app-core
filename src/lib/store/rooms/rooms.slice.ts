import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as _ from 'lodash'
import { Message } from '../../types/state/index'
import { RoomState } from '../../types/state/state/index'

const initialState: Record<string, RoomState> = {
}

/**
 * Merges one room status message into the rooms state (an Immer draft). Partial updates: a
 * null/undefined incoming value means "no change", and arrays are replaced rather than merged.
 */
function mergeRoomMessage(state: Record<string, RoomState>, message: Message): void {
    const type = message.type;
    const key = type.slice(type.lastIndexOf('/') + 1);

    if(!key) return;

    // This method solves the issue of multiple layers of properties
    // and avoids doing a deep copy of the object
    const content = message.content as RoomState;

    // Get existing room state
    const existingState = state[key] ?? {};

    // merge new state with existing (replace arrays instead of merging them)
    const newState = _.mergeWith({}, existingState, content, (objValue, srcValue) => {
        // Partial updates: a null/undefined incoming value means "no change", so keep the
        // existing value instead of letting the default merge overwrite it (lodash skips
        // undefined but overwrites with null).
        if (srcValue == null) return objValue;
        if (Array.isArray(srcValue)) return srcValue;
        return undefined; // fallback to default merge behavior
    });

    // overlay the incoming state properties onto the existing item
    // or create new item
    state[key] = newState;
}

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        setRoomState(state, action:PayloadAction<Message>) {
            mergeRoomMessage(state, action.payload);
            // Don't return state - Immer handles this automatically
        },
        /**
         * Applies many room status messages, in order, as one store update - e.g. an aggregated
         * batch status reply.
         */
        setManyRoomStates(state, action: PayloadAction<Message[]>) {
            action.payload.forEach((message) => mergeRoomMessage(state, message));
        },
        clearRooms() {
            return initialState;
        },
    },
})


export const roomsActions = {
    setRoomState: roomsSlice.actions.setRoomState,
    setManyRoomStates: roomsSlice.actions.setManyRoomStates,
    clearRooms: roomsSlice.actions.clearRooms
}
export const roomsReducer =  roomsSlice.reducer;
