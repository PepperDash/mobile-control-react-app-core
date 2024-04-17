// import { useGetDevice } from 'src/lib/store';
// import { SurroundSoundModeState } from 'src/lib/types';
// import { useWebsocketContext } from 'src/lib/utils/useWebsocketContext';


// export function useISurroundSoundModes(key: string): ISurroundSoundModesReturn | undefined {
//   const { sendMessage } = useWebsocketContext();
//   const device = useGetDevice<SurroundSoundModeState>(key);

//   if (!device) return undefined;

//   const setMode = (mode: string) => {
//     sendMessage(`/device/${key}/${mode}`, null);
//   };

//   return { modeState: device, setMode };
// }

// export interface ISurroundSoundModesReturn {
//   modeState: SurroundSoundModeState;
//   setMode: (inputKey: string) => void;
// }