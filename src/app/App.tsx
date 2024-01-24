import { Provider } from 'react-redux';
import RoomConfigurationDisplay from '../shared/RoomConfigurationDisplay.tsx';
import MainLayout from '../shared/layout/habanero/MainLayout.tsx';
import { store } from '../store/index.ts';
import { WebsocketProvider } from '../utils/WebsocketContext.tsx';

function App() {
  return ( 
    <Provider store={store}>
      <WebsocketProvider>
        {/* <RoomBusinessLogic> */}
        <MainLayout 
          header={<div>Logo and Header Stuff</div>}
          content={<RoomConfigurationDisplay />}
          footer={<div>I'm a Footer.  Put stuff here</div>}
          volume={<div>Volume Controls Here</div>}
        />   
        {/* </RoomBusinessLogic> */}
      </WebsocketProvider>
    </Provider>
  )
}

export default App
