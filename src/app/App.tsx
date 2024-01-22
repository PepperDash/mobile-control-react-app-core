import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { initialize } from '../services/apiService.ts';
import { store } from '../store/index.ts';
import { WebsocketProvider } from '../utils/WebsocketContext.tsx';
import './App.css';

function App() {
  async function init() {
    await initialize();
  }

  useEffect(() => {
    init();
  }, []);

  return ( 
    <Provider store={store}>
      <WebsocketProvider>
          Hello World
      </WebsocketProvider>
    </Provider>
  )
}

export default App
