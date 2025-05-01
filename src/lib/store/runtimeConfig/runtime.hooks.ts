import { useAppSelector } from '../hooks';
import { selectClientId, selectIsTouchpanel, selectRoomKey, selectRuntimeInfo, selectServerIsRunningOnProcessorHardware, selectSystemUuid, selectTouchpanelKey, selectUserCode, selectWsIsConnected } from './runtime.selectors';

export const useWsIsConnected = () => useAppSelector(selectWsIsConnected);

export const useRoomKey = () => useAppSelector(selectRoomKey);

export const useClientId = () => useAppSelector(selectClientId);

export const useSystemUuid = () => useAppSelector(selectSystemUuid);

export const useUserCode = () => useAppSelector(selectUserCode);

export const useServerIsRunningOnProcessorHardware = () => useAppSelector(selectServerIsRunningOnProcessorHardware);

export const useRuntimeInfo = () => useAppSelector(selectRuntimeInfo);

export const useTouchpanelKey = () => useAppSelector(selectTouchpanelKey);

export const useIsTouchpanel = () => useAppSelector(selectIsTouchpanel);
