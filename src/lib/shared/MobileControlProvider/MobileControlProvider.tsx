import { Provider } from "react-redux";
import { store } from "../../store/index";
import { WebsocketProvider } from "../../utils/WebsocketContext";

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
