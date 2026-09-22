import { Store } from '@reduxjs/toolkit';
import { touchPanelActions } from '../touchPanel/touchPanel.slice';
import setupTrilist from './trilist';

const { setControlSystemOnline, setMcAppUrl, setPanelIpAddress } =
  touchPanelActions;

/**
 * Wires up the touchpanel/joins (trilist) redux plugin. Called automatically
 * on store creation (see store.ts), so consumers do not need to call this
 * themselves. Safe to call again — setupTrilist is idempotent.
 */
export const applyReduxPlugins = (store: Store) => {
  setupTrilist(store, {
    actions: { setControlSystemOnline, setMcAppUrl, setPanelIpAddress },
  });

  return store;
};

export default applyReduxPlugins;
