import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: UiConfigState = {
  showReconnect: false,
  error: '',
  modalVisibility: {
    showShutdownModal: false,
    showIncomingCallModal: false,
  },
  popoverVisibility: {},
  syncState: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    clearAllModals(state) {
      Object.entries(state.modalVisibility).forEach(([key]) => {
        state.modalVisibility[key as string] = false;
      });
    },
    setModalState(
      state,
      action: PayloadAction<{ modalType: modalType | string; value: boolean }>
    ) {
      state.modalVisibility[action.payload.modalType] = action.payload.value;
    },
    setShowShutdownModal(state, action: PayloadAction<boolean>) {
      state.modalVisibility['showShutdownModal'] = action.payload;
    },
    setIncomingCallModal(state, action: PayloadAction<boolean>) {
      state.modalVisibility['showIncomingCallModal'] = action.payload;
    },
    setPopoverState(
      state,
      action: PayloadAction<{
        popoverGroup: popoverGroup | string;
        popoverId: string;
        value: boolean;
      }>
    ) {
      if (!state.popoverVisibility[action.payload.popoverGroup]) {
        state.popoverVisibility[action.payload.popoverGroup] = {};
      }

      // close all other popovers in the group
      Object.entries(
        state.popoverVisibility[action.payload.popoverGroup]
      ).forEach(([key]) => {
        state.popoverVisibility[action.payload.popoverGroup][key] = false;
      });

      state.popoverVisibility[action.payload.popoverGroup][
        action.payload.popoverId
      ] = action.payload.value;
    },
    setErrorMessage(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setShowReconnect(state, action: PayloadAction<boolean>) {
      state.showReconnect = action.payload;
    },
    setTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload;
    },
    addSyncState(state, action: PayloadAction<string>) {
      if (!state.syncState.includes(action.payload)) {
        state.syncState.push(action.payload);
      }
    },
    removeSyncState(state, action: PayloadAction<string>) {
      state.syncState = state.syncState.filter(
        (item) => item !== action.payload
      );
    },
    clearSyncState(state) {
      state.syncState = [];
    },
  },
});

export interface UiConfigState {
  showReconnect: boolean;
  error: string;
  modalVisibility: Record<modalType | string, boolean>;
  popoverVisibility: Record<popoverGroup | string, Record<string, boolean>>;
  theme?: string;
  /**
   * A set of strings representing states that need to be synced before the app is considered "in sync"
   * Used as a way to track what components have finished their initial data loading as a rudimentary
   * cache mechanism
   */
  syncState: string[];
}

type modalType = 'showShutdownModal' | 'showIncomingCallModal';
type popoverGroup = 'header' | 'rightDrawer';

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
