// context/RequireAuth.js
import React, { useEffect } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAppContext from './useAppContext';

const RequireAuth = ({ allowedRoles }) => {

  const location = useLocation();

  const { state, dispatch } = useAppContext();
  const { auth } = state;
  const { token, user } = auth;


  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (!token && storedAuth) {

      console.log(storedAuth);
      dispatch({ type: 'SET_AUTH', payload: JSON.parse(storedAuth) });
    } else if (!token) {
      dispatch({ type: 'SET_AUTH', payload: { token: null, user: null } });
    }
  }, [token, dispatch]);

  console.log('User:', user);

  if (!state.auth.token) {
    console.log('No token found, redirecting to login.');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (state.auth.token && user && allowedRoles.includes(user.name)) {
    console.log('User authorized, rendering outlet.');
    return <Outlet />;
  }

  console.log('User not authorized, redirecting to 404.');
  return <Navigate to="/login" replace />;
};

export default RequireAuth;
