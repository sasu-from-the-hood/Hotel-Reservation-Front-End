import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authcontext";

const ProtectedRoute = ({ allowedTypes }) => {
  const { isAuthenticated, userType, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/registration" />;
  }

  if (allowedTypes && userType !== allowedTypes) {
    return <Navigate to="/" />; // Redirect to home or a 403 page
  }

  return <Outlet />;
};

export default ProtectedRoute;
