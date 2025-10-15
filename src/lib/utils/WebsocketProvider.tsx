import { ReactNode, useCallback, useEffect } from 'react';
import DisconnectedMessage from '../shared/disconnectedMessage/DisconnectedMessage';
import {
  useAppDispatch,
  wsAddEventHandler,
  wsConnect,
  wsReconnect,
  wsRemoveEventHandler,
  wsSendMessage,
} from '../store';
import { useWsIsConnected } from '../store/runtimeConfig/runtime.hooks';
import { Message, SimpleContent } from '../types';
import { WebsocketContext } from './WebsocketContext';

/**
 * Backward-compatible WebSocket provider that uses Redux middleware
 * Maintains the same API as the original WebsocketProvider
 *
 * @param children the child components
 */
const WebsocketProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const isConnected = useWsIsConnected();

  /**
   * Connect to WebSocket on mount
   */
  useEffect(() => {
    dispatch(wsConnect());
  }, [dispatch]);

  /**
   * Sends a message to the server
   */
  const sendMessage = useCallback(
    (type: string, content: SimpleContent | unknown) => {
      dispatch(wsSendMessage(type, content));
    },
    [dispatch]
  );

  /**
   * Helper function to send a simple message with a boolean, number, or string value
   */
  const sendSimpleMessage = useCallback(
    (type: string, value: boolean | number | string) => {
      sendMessage(type, { value });
    },
    [sendMessage]
  );

  /**
   * Add an event handler
   */
  const addEventHandler = useCallback(
    (eventType: string, key: string, callback: (data: Message) => void) => {
      dispatch(wsAddEventHandler(eventType, key, callback));
    },
    [dispatch]
  );

  /**
   * Remove an event handler
   */
  const removeEventHandler = useCallback(
    (eventType: string, key: string) => {
      dispatch(wsRemoveEventHandler(eventType, key));
    },
    [dispatch]
  );

  /**
   * Reconnect to the WebSocket
   */
  const reconnect = useCallback(() => {
    dispatch(wsReconnect());
  }, [dispatch]);

  //* RENDER **********************************************************/
  return (
    <WebsocketContext.Provider
      value={{
        sendMessage,
        sendSimpleMessage,
        addEventHandler,
        removeEventHandler,
        reconnect,
      }}
    >
      {isConnected ? children : <DisconnectedMessage />}
    </WebsocketContext.Provider>
  );
};

export default WebsocketProvider;
