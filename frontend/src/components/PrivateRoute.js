// src/components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');  // Check if the token exists in localStorage

  if (!token) {
    return <Navigate to="/login" />;  // If no token, redirect to the login page
  }

  return children;  // If the user is authenticated, render the children (the component)
};

export default PrivateRoute;
