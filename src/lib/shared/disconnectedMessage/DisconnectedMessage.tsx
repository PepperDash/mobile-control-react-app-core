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
    <div className={classes.container}>
      <div className={classes.content}>
        {isConnected === undefined ? (
          <h2>Connecting...</h2>
        ) : (
          <h2>Disconnected</h2>
        )}
        {errorMessage && <h5 className={classes.error}>{errorMessage}</h5>}
      </div>
      {showReconnect && (
        <button className={classes.reconnectButton} onPointerDown={reconnect}>
          Reconnect
        </button>
      )}
    </div>
  );
};

export default DisconnectedMessage;
