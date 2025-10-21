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
    <>
      <div
        className={`disconnected-message ${classes.mwfit} mx-auto text-center`}
      >
        {isConnected === undefined ? (
          <h1>Connecting...</h1>
        ) : (
          <h1>Disconnected</h1>
        )}
        {errorMessage && <h5>{errorMessage}</h5>}
        {showReconnect && (
          <button
            className="btn btn-secondary btn-lg"
            onPointerDown={reconnect}
          >
            Reconnect
          </button>
        )}
      </div>
    </>
  );
};

export default DisconnectedMessage;
