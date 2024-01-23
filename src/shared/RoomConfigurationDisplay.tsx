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
    Room Config for {roomKey}:

    <pre>{configData}</pre>
  </>;
}

export default RoomConfigurationDisplay;