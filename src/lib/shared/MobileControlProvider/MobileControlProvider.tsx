import { Provider } from 'react-redux';
import { initWebXPanel } from '../../services/webXPanel';
import { store } from '../../store/index';
import WebsocketProvider from '../../utils/WebsocketProvider';

// Runs at module load (before the Provider component even mounts) so the Zoom
// handshake's `message` listener is registered as early as possible, before
// the ZRC host shell posts its ack. initWebXPanel() itself checks the
// `?zoomRoom=true` URL query param and is a no-op when it's absent.
initWebXPanel();

/**
 * This needs to be wrapped around the entire app to provide the websocket context
 * Exposes the store and websocket context to the app
 * const { sendMessage } = useWebsocketContext(); will be available in any component to allow sending messages to the serverßß
 * @param children
 */
export const MobileControlProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Provider store={store}>
      <WebsocketProvider>{children}</WebsocketProvider>
    </Provider>
  );
};
