import { Provider } from "react-redux";
import WebsocketProvider from 'src/lib/utils/WebsocketContext';
import { store } from "../../store/index";

/**
 * This needs to be wrapped around the entire app to provide the websocket context
 * @param children
 */
const MobileControlProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <WebsocketProvider>{children}</WebsocketProvider>
    </Provider>
  );
};

export default MobileControlProvider;
