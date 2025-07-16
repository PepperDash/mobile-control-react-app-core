import {
  useGetAllDeviceStateFromRoomConfiguration, useINumeric
} from "src/lib/shared";
import { useRoomConfiguration } from "../lib/store/rooms/rooms.hooks";
import { useRoomKey } from "../lib/store/runtimeConfig/runtime.hooks";

const RoomConfigurationDisplay = () => {
  const roomKey = useRoomKey();
  const config = useRoomConfiguration(roomKey);
  const numericKey = useINumeric(roomKey);

  useGetAllDeviceStateFromRoomConfiguration({ config });

  const configData = JSON.stringify(config, null, 2);
  console.log("configData", configData);


  return (
    <>
      <div className="w-100 h-100 d-flex flex-column text-center overflow-auto">
        Room Config for {roomKey}:
        <pre className="text-wrap overflow-auto">{configData}</pre>
        <button {...numericKey.digit0}>0</button>
      </div>
    </>
  );
};

export default RoomConfigurationDisplay;
