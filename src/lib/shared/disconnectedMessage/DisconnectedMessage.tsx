import {
  useError,
  useShowReconnect,
  useWebsocketContext,
  useWsIsConnected,
} from 'src/lib';
import classes from './DisconnectedMessage.module.scss';

const DisconnectedMessage = () => {
  const { reconnect } = useWebsocketContext();
  const isConnected = useWsIsConnected();
  const errorMessage = useError();
  const showReconnect = useShowReconnect();

  return (
    <div className="vh-100 d-flex flex-column flex-grow-1 justify-content-center align-items-center gap-5 ">
      <div className={`${classes.mwfit} mx-auto text-center`}>
        {isConnected === undefined ? (
          <h2>Connecting...</h2>
        ) : (
          <h2>Disconnected</h2>
        )}
        {errorMessage && <h5 className="mt-1">{errorMessage}</h5>}
      </div>
      {showReconnect && (
        <button className="btn btn-secondary btn-lg" onPointerDown={reconnect}>
          Reconnect
        </button>
      )}
    </div>
  );
};

export default DisconnectedMessage;
