// utils/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore'; // Import your Zustand store
import Loading from '../pages/Loading';
import { User } from '../data/user';

const ProtectedRoute: React.FC = () => {
  const { authUser, requestLoading } = useAuthStore();
  const [isVerified, setIsVerified] = useState(false);

  // Check if the user is verified
  useEffect(() => {
    if (!requestLoading) {
      setIsVerified(true);
    }
  }, [requestLoading]);

  if (!isVerified || requestLoading) {
    return <Loading />; // Show the loading component until verification is complete
  }


  // If authUser is null, navigate to the '/login' route
  if (authUser instanceof User && typeof authUser.getVerified === 'function' && !authUser.getEmail()) {
    return <Navigate to="/login" />;
  }

  // If authUser is not null and not verified, navigate to the '/stripe' route
  if (authUser instanceof User && typeof authUser.getVerified === 'function' && !authUser.getVerified()) {
    return <Navigate to="/stripe" />;
  }

  return authUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;