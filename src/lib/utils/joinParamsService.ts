import { SessionStorageValues } from "../types";
import sessionStorageKeys from "../types/classes/session-storage-keys";

export function getValuesFromUrl(window: Window): SessionStorageValues {
  const qp = new URLSearchParams(window.location.search);

  const rv: SessionStorageValues = {
    uuid: qp.get("uuid") || "",
    roomKey: qp.get("roomKey") || "",
    code: qp.get("code") || "",
  };
  return rv;
}

export function loadValues(): SessionStorageValues {
  const rv: SessionStorageValues = {
    uuid: "",
    roomKey: "",
    code: "",
    expiry: "",
  };

  const tempUuid = sessionStorage.getItem(sessionStorageKeys.uuid);
  const tempRoomKey = sessionStorage.getItem(sessionStorageKeys.roomKey);
  const tempCode = sessionStorage.getItem(sessionStorageKeys.code);
  const tempExpiry = sessionStorage.getItem(sessionStorageKeys.expiry);

  rv.uuid = tempUuid || "";
  rv.roomKey = tempRoomKey || "";
  rv.code = tempCode || "";
  rv.expiry = tempExpiry || "";

  return rv;
}

export function loadValue(key: string): string {
  const rv = sessionStorage.getItem(key);
  return rv || "";
}

/**
 * Removes all MC-related values
 */
export function deleteValues(): void {
  sessionStorage.removeItem(sessionStorageKeys.uuid);
  sessionStorage.removeItem(sessionStorageKeys.roomKey);
  sessionStorage.removeItem(sessionStorageKeys.code);
  sessionStorage.removeItem(sessionStorageKeys.expiry);
}

/**
 * Deletes a single value
 * @param key key of the value to delete
 */
export function deleteValue(key: string): void {
  sessionStorage.removeItem(key);
}

/**
 * Saves all MC-related values
 * @param values {@link SessionStorageValues} Values to save
 */
export function saveValues(values: SessionStorageValues): void {
  sessionStorage.setItem(sessionStorageKeys.uuid, values.uuid);
  sessionStorage.setItem(sessionStorageKeys.roomKey, values.roomKey);
  sessionStorage.setItem(sessionStorageKeys.code, values.code);
  sessionStorage.setItem(sessionStorageKeys.expiry, values.expiry || "");
}

/**
 * Saves a single value
 * @param key Key to save value
 * @param value Value to save
 */
export function saveValue(key: string, value: string): void {
  sessionStorage.setItem(key, value);
}
