import { Provider } from "react-redux";
import WebsocketProvider from '../../utils/WebsocketProvider';
import { store } from "../../store/index";

/**
 * This needs to be wrapped around the entire app to provide the websocket context
 * Exposes the store and websocket context to the app
 * const { sendMessage } = useWebsocketContext(); will be available in any component to allow sending messages to the serverßß
 * @param children
 */
export const MobileControlProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <WebsocketProvider>{children}</WebsocketProvider>
    </Provider>
  );
};


