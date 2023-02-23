import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from './layouts/Root/Root';
import PageNotFound from './pages/Errors/PageNotFound';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Favorite from './pages/Favorite/Favorite';

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
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'favorites',
        element: <Favorite />,
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
