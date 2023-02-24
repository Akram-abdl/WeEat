import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { auth } from '../../utils/firebaseSetup';

export default function ProtectedRoute() {
  const { currentUser } = auth;
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser]);

  return <Outlet />;
}
