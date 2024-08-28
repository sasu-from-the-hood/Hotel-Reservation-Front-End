import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authcontext";

const PublicRoute = () => {
  const { user } = useAuth();

  if (user) {
    // If the user is logged in, redirect to the home page
    return <Navigate to="/" replace />;
  }

  // If the user is not logged in, render the child routes
  return <Outlet />;
};

export default PublicRoute;
