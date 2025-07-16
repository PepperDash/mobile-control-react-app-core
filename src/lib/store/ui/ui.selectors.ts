import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../..';


const uiState = (state: RootState) => state.ui;

export const selectModalVisibility = (modalType: string) => createSelector(
  uiState,
  (ui) => ui.modalVisibility[modalType]
);

export const selectCurrentPopoverIdForGroup = (popoverGroup: string) => createSelector(
  uiState,
  (ui) =>  {
    // get the first popover id whose value is true in the group
    const popover = ui.popoverVisibility[popoverGroup];
    if (!popover) {
      return undefined;
    } else {
      return Object.keys(popover).find((key) => popover[key]);
    }  
  }
);

export const selectShowPopoverById = (popoverGroup: string, popoverId: string) => createSelector(
  uiState,
  (ui) => ui.popoverVisibility[popoverGroup]?.[popoverId] ?? false
);

export const selectError = createSelector(
  uiState,
  (ui) => ui.error
);

export const selectShowReconnect = createSelector(
  uiState,
  (ui) => ui.showReconnect
);

export const selectTheme = createSelector(
  uiState,
  (ui) => ui.theme
);