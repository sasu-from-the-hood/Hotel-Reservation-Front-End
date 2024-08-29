import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authcontext";

const ProtectedRoute = ({ allowedTypes }) => {
  const { isAuthenticated, userType, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or a more sophisticated loading screen.
  }

  if (!isAuthenticated) {
    return <Navigate to="/registration" />;
  }

  if (allowedTypes && !allowedTypes.includes(userType)) {
    return <Navigate to="/" />; // Redirect to home or a 403 page
  }

  return <Outlet />;
};

export default ProtectedRoute;
