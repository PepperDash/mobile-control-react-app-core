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
    <div className="vh-100 d-flex flex-grow-1 justify-content-center align-items-center">
      <div className={`${classes.mwfit} mx-auto text-center`}>
        {isConnected === undefined ? (
          <h3>Connecting...</h3>
        ) : (
          <h3>Disconnected</h3>
        )}
        {errorMessage && <h6>{errorMessage}</h6>}
        {showReconnect && (
          <button
            className="btn btn-secondary btn-lg"
            onPointerDown={reconnect}
          >
            Reconnect
          </button>
        )}
      </div>
    </div>
  );
};

export default DisconnectedMessage;
