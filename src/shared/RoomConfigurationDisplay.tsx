import { useMemo } from 'react';
import { useRoomConfiguration } from '../store/rooms/roomsSelectors.ts';
import { useRoomkey as useRoomKey } from '../store/runtimeConfig/runtimeSelectors.ts';
import { useWebsocketContext } from '../utils/WebsocketContext.tsx';

const RoomConfigurationDisplay = () => {
  const {sendMessage} = useWebsocketContext();
  const roomKey = useRoomKey();
  const config = useRoomConfiguration(roomKey);

  const configData = useMemo(() => {

    if (!config) {
      return 'No config found';
    }

    const deviceKeys = [];

    config.displayKeys.forEach(d => {
      deviceKeys.push(d);
    });

    config.environmentalDevices.forEach(d => {
      deviceKeys.push(d);
    });

    // TODO: figure out how to iterate this
    // config.sourceList.forEach(sli => {
    //   deviceKeys.push(sli.deviceKey);
    // });

    if(config.audioCodecKey) {
      deviceKeys.push(config.audioCodecKey);
    }

    if(config.videoCodecKey) {
      deviceKeys.push(config.videoCodecKey);
    }

    deviceKeys.forEach(dk => {
      sendMessage(`/device/${dk}/fullStatus`, {deviceKey: dk});
    })

    return JSON.stringify(config, null, 2);

  }, [config, sendMessage])

  return <>
    <div className='d-flex flex-column text-center overflow-hidden'>
      Room Config for {roomKey}:

      <pre className='text-wrap overflow-auto'>{configData}</pre>
    </div>
  </>;
}

export default RoomConfigurationDisplay;