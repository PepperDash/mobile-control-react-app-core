import { useMemo } from 'react';
import { useRoomConfiguration } from '../store/rooms/roomsSelectors.ts';
import { useRoomkey as useRoomKey } from '../store/runtimeConfig/runtimeSelectors.ts';

const RoomConfigurationDisplay = () => {
  const roomKey = useRoomKey();
  const config = useRoomConfiguration(roomKey);

  const configData = useMemo(() => {
    return JSON.stringify(config);


  }, [config])

  return <>
    <div className='d-flex flex-column text-center'>
      Room Config for {roomKey}:

      <pre className='text-wrap'>{configData}</pre>
    </div>
  </>;
}

export default RoomConfigurationDisplay;