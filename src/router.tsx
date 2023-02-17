import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from './Layouts/Root/Root';
import PageNotFound from './pages/Errors/PageNotFound';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

const router = createBrowserRouter([
  {
    path: '',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
