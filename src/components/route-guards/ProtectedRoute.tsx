import React from 'react';
import { Navigate } from 'react-router-dom';
import { RouteMeta } from 'routes';

interface ProtectedRouteProps {
  meta: RouteMeta;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ meta, children }) => {
  const isAuthenticated = true; // Replace with actual auth logic
  const userRole = 'User'; // Replace with actual role logic

  React.useEffect(() => {
    if (meta.title) {
      document.title = meta.title; // This is equivalent to using a `useTitle` hook
    }
  }, [meta.title]);

  if (!isAuthenticated && meta.requiresAuth) {
    return <Navigate to="/login" replace />;
  }

  if (meta.roles && !meta.roles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
