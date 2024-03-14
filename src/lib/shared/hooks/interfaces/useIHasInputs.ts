import { useGetDevice } from 'src/lib/store';
import { InputsState } from 'src/lib/types';
import { useWebsocketContext } from 'src/lib/utils/useWebsocketContext';


export function useIHasInputs(key: string): IHasInputsReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const device = useGetDevice<InputsState>(key);

  if (!device) return undefined;

  const setInput = (inputKey: string) => {
    sendMessage(`/device/${key}/${inputKey}`, null);
  };

  return { inputsState: device, setInput };
}

export interface IHasInputsReturn {
  inputsState: InputsState;
  setInput: (inputKey: string) => void;
}