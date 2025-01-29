import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [permissions, setPermissions] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      checkPermissions();
    } else {
      setLoading(false);
    }
  }, []);

  // Function to check and set user role and permissions from localStorage
  const checkPermissions = () => {
    const storedPermissions = localStorage.getItem('permissions');
    const storedUserRole = localStorage.getItem('loginUser');

    if (storedPermissions && storedUserRole) {
      const parsedPermissions = JSON.parse(storedPermissions);
      setUserRole(parseInt(storedUserRole, 10));
      setPermissions(parsedPermissions);
      setIsAuthenticated(true);
    }
    setLoading(false); // Set loading to false once permissions are checked
  };

  // Function to log in the user and store role and permissions in localStorage
  const authLogin = (userData) => {
    setUser(userData);
    // setUserRole(role);
    // setPermissions(permission);
    setIsAuthenticated(true);
    // localStorage.setItem("permissions", JSON.stringify(permission));
    // localStorage.setItem("loginUser", role);
    localStorage.setItem('user', JSON.stringify(userData));
    // if (role === 3) {
    //   navigate("/servicemandashboard");
    // } else if (role === 4) {
    //   navigate("/auditordashboard");
    // } else {
    navigate('/');
    // }
  };

  // Function to log out the user
  const authLogout = () => {
    setUser(null);
    setUserRole(null);
    setPermissions(null);
    setIsAuthenticated(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('permissions');
    localStorage.removeItem('loginUser');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const value = {
    user,
    userRole,
    permissions,
    isAuthenticated,
    authLogin,
    authLogout,
  };

  // // Show a loading spinner or similar while loading
  // if (loading) {
  //   return <Loading/> // Customize this with a better loading UI
  // }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
