import { useGetAllDeviceStateFromRoomConfiguration } from 'src/lib/shared';
import { useRoomConfiguration } from 'src/lib/store/rooms/roomsSelectors';
import { useRoomKey } from 'src/lib/store/runtimeConfig/runtimeSelectors';



const RoomConfigurationDisplay = () => {
  const roomKey = useRoomKey();
  const config = useRoomConfiguration(roomKey);

  useGetAllDeviceStateFromRoomConfiguration({config});

  const configData = JSON.stringify(config, null, 2);

  return <>
    <div className='d-flex flex-column text-center overflow-hidden'>
      Room Config for {roomKey}:

      <pre className='text-wrap overflow-auto'>{configData}</pre>
    </div>
  </>;
}

export default RoomConfigurationDisplay;