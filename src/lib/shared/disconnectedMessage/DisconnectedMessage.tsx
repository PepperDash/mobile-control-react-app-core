import { useError, useShowReconnect, useWebsocketContext } from "src/lib";
import classes from './DisconnectedMessage.module.scss';

const DisconnectedMessage = () => {
  const { reconnect } = useWebsocketContext();
  const errorMessage = useError();
  const showReconnect = useShowReconnect();


  return<>
    <div className={`disconnected-message ${classes.mwfit} mx-auto text-center`}>
      <h1>Disconnected</h1>      
      {errorMessage && <h5>{errorMessage}</h5>}
      {showReconnect && <button className="btn btn-secondary btn-lg" onClick={reconnect}>Reconnect</button>}
    </div>
  </>
}

export default DisconnectedMessage;