import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from './layouts/Root/Root';
import PageNotFound from './pages/Errors/PageNotFound';

const Home = React.lazy(() => import('./pages/Home/Home'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const Register = React.lazy(() => import('./pages/Register/Register'));
const Profile = React.lazy(() => import('./pages/Profile/Profile'));
const Favorites = React.lazy(() => import('./pages/Favorites/Favorites'));
const Search = React.lazy(() => import('./pages/Search/Search'));

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
        element: <Favorites />,
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
