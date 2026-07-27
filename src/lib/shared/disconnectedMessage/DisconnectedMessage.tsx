import { useEffect, useRef, useState } from 'react';
import {
  ConnectionStage,
  isZoomRoomRequested,
  useConnectionStage,
  useError,
  useShowReconnect,
  useWebsocketContext,
  useWebXPanelCipConnected,
  useWebXPanelError,
  useWebXPanelWsConnected,
  useWsIsConnected,
} from 'src/lib';
import classes from './DisconnectedMessage.module.scss';

/**
 * Human-readable labels for each stage of the startup/connection sequence.
 */
const connectionStageLabels: Record<ConnectionStage, string> = {
  idle: 'Initializing…',
  'loading-config': 'Loading app configuration…',
  'loading-version': 'Checking server version…',
  'waiting-for-token': 'Waiting for connection token…',
  'loading-room': 'Joining room…',
  'connecting-websocket': 'Opening connection to server…',
  connected: 'Connected',
  retrying: 'Retrying connection…',
  error: 'Connection error',
};

const DisconnectedMessage = () => {
  const { reconnect } = useWebsocketContext();
  const isConnected = useWsIsConnected();
  const errorMessage = useError();
  const showReconnect = useShowReconnect();
  const connectionStage = useConnectionStage();
  const webXPanelWsConnected = useWebXPanelWsConnected();
  const webXPanelCipConnected = useWebXPanelCipConnected();
  const webXPanelError = useWebXPanelError();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const stageStartRef = useRef(Date.now());

  // Reset the elapsed timer whenever the stage changes, so it reflects how
  // long the app has been stuck on the *current* step rather than since the
  // page first loaded.
  useEffect(() => {
    stageStartRef.current = Date.now();
    setElapsedSeconds(0);
  }, [connectionStage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds(
        Math.floor((Date.now() - stageStartRef.current) / 1000)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="vh-100 d-flex flex-column flex-grow-1 justify-content-center align-items-center gap-5 ">
      <div className={`${classes.mwfit} mx-auto text-center`}>
        {isConnected === undefined ? (
          <h2>Connecting...</h2>
        ) : (
          <h2>Disconnected</h2>
        )}
        <p className="mt-2 mb-0">
          {connectionStageLabels[connectionStage]}
          {elapsedSeconds > 0 && ` (${elapsedSeconds}s)`}
        </p>
        {errorMessage && <h5 className="mt-1">{errorMessage}</h5>}
        {isZoomRoomRequested() && (
          <div className="mt-3">
            <p className="mb-0">
              <small>
                WebXPanel WS:{' '}
                {webXPanelWsConnected ? 'connected' : 'disconnected'}
                {' · '}
                CIP: {webXPanelCipConnected ? 'connected' : 'disconnected'}
              </small>
            </p>
            {webXPanelError && (
              <p className="mt-1 mb-0 text-danger">
                <small>{webXPanelError}</small>
              </p>
            )}
          </div>
        )}
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
