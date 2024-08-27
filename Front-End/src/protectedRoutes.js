import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authcontext";

const ProtectedRoute = ({ allowedTypes }) => {
  const { isAuthenticated, userType } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/registration" />;
  }

  if (allowedTypes && !allowedTypes.includes(userType)) {
    return <Navigate to="/" />; // Redirect to home or a 403 page
  }

  return <Outlet />;
};

export default ProtectedRoute;
