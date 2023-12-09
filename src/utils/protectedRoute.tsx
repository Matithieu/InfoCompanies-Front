// utils/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useStore from '../store'; // Import your Zustand store

const ProtectedRoute: React.FC = () => {
  const { authUser } = useStore(); // Use authUser to determine if user is authenticated

  const isAuthenticated = !!authUser; // Check if authUser is not null

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
