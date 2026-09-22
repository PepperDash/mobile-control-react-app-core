import { CrComLib } from '@pepperdash/ch5-crcomlib-lite';
import { Store, UnknownAction } from '@reduxjs/toolkit';

export interface IControlSystemActions {
  actions: {
    setControlSystemOnline: (online: boolean) => UnknownAction;
    setMcAppUrl: (address: string) => UnknownAction;
    setPanelIpAddress: (address: string) => UnknownAction;
  };
}

let initialized = false;

function setupTrilist(store: Store, options: IControlSystemActions) {
  // Idempotent — this is called automatically on store creation, so guard
  // against a duplicate subscription if a consumer also calls it directly.
  if (initialized) {
    return store;
  }
  initialized = true;

  CrComLib.subscribeState(
    'b',
    'Csig.All_Control_Systems_Online_fb',
    (value: boolean) =>
      store.dispatch(options.actions.setControlSystemOnline(value))
  );
  CrComLib.subscribeState('s', 'Csig.Ip_Address_fb', (value: string) =>
    store.dispatch(options.actions.setPanelIpAddress(value))
  );

  // Pulsed from the control system to request a reload. `subscribeState`
  // invokes its callback immediately with the join's current cached value on
  // subscribe — if the join hasn't been pulsed `true` yet (e.g. right after a
  // fresh page load), that first callback fires with `false`. Treating that
  // as a falling edge would reload immediately, which re-subscribes and gets
  // `false` again, looping forever. `sawTrue` guards against reloading until
  // a real true -> false transition has been observed.
  let sawTrue = false;
  CrComLib.subscribeState('b', '1', (value: boolean) => {
    if (value) {
      sawTrue = true;
      return;
    }
    if (!sawTrue) {
      return;
    }
    window.location.reload();
  });

  CrComLib.subscribeState('s', '1', (value: string) =>
    store.dispatch(options.actions.setMcAppUrl(value))
  );

  return store;
}

export default setupTrilist;
