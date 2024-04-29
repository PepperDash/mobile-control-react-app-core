import { useRoomState } from 'src/lib';
import { ITechPasswordState } from 'src/lib/types/state/state/ITechPasswordState';
import { useWebsocketContext } from 'src/lib/utils';


export function useITechPassword(key: string): ITechPasswordReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const techPasswordState = useRoomState(key) as ITechPasswordState | undefined;
 
  if(!techPasswordState) return undefined;

  const validatePassword = (password: string) => {
    sendMessage(`/room/${key}/validateTechPassword`, {password});
  };

  const setPassword = (oldPassword: string, newPassword: string) => {
    sendMessage(`/room/${key}/setTechPassword`, {oldPassword, newPassword});
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