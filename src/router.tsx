import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from './layouts/Root/Root';
import PageNotFound from './pages/Errors/PageNotFound';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';
import Register from './pages/Register/Register';

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
        path: 'register',
        element: <Register />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
