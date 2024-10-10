import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthToken from '../hooks/useAuthToken';

const PrivateRoute = () => {
  const { token } = useAuthToken();

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
