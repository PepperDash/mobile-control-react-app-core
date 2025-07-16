import { useRoomState } from '../../..';
import { ITechPasswordState } from '../../../types/state/state/ITechPasswordState';
import { useWebsocketContext } from '../../../utils';

/**
 * hook that controls a room that implements the ITechPassword interface
 * @param roomKey key of the room
 * @returns 
 */
export function useITechPassword(roomKey: string): ITechPasswordReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const techPasswordState = useRoomState(roomKey) as ITechPasswordState | undefined;
 
  if(!techPasswordState) return undefined;

  const validatePassword = (password: string) => {
    sendMessage(`/room/${roomKey}/validateTechPassword`, {password});
  };

  const setPassword = (oldPassword: string, newPassword: string) => {
    sendMessage(`/room/${roomKey}/setTechPassword`, {oldPassword, newPassword});
  };

  return { techPasswordState, validatePassword, setPassword };
}

export interface ITechPasswordReturn {
  techPasswordState: ITechPasswordState;
  validatePassword: (password: string) => void;
  setPassword: (oldPassword: string, newPassword: string) => void;
}

export interface ITechPasswordValidationResponse {
  isValid: boolean;
}

export type ITechPasswordEventTypes = 'passwordChangedSuccessfully' | 'passwordValidationResult';