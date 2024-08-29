import React, { createContext, useState, useContext, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userType: null, // 'user', 'admin', 'superadmin'
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userType = decodedToken.user_type || decodedToken.admin_type;
        setAuthState({ isAuthenticated: true, userType });
      } catch (error) {
        console.error("Invalid token");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token);
    const userType = decodedToken.user_type || decodedToken.admin_type;
    setAuthState({ isAuthenticated: true, userType });
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, userType: null });
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
