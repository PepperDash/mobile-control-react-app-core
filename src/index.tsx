import React from "react";
import { createRoot } from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import App from "./app/App.tsx";
import ErrorBox from './shared/layout/ErrorBox.tsx';
  
const router = createBrowserRouter(
    [
      { path: '*', Component: App, errorElement: <ErrorBox /> },
    ],
    {
      basename: '/mc/app',
    }
  );
  
  const container = document.getElementById('root');
  if (!container) throw new Error('Cannot get root element. Check index.html');
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      {/* <Provider store={store}> */}
        <RouterProvider router={router} />
      {/* </Provider> */}
    </React.StrictMode>
  );
  