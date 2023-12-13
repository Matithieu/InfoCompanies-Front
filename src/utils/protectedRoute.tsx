// utils/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useStore from '../store/authStore'; // Import your Zustand store
import Loading from '../pages/Loading/Component';

const ProtectedRoute: React.FC = () => {
  const { authUser, requestLoading } = useStore();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!requestLoading) {
      setIsVerified(true);
    }
  }, [requestLoading]);

  if (!isVerified || requestLoading) {
    return <Loading />; // Affiche le composant de chargement tant que la vérification n'est pas terminée
  }

  return authUser ? <Outlet /> : <Navigate to="/login" />;
};


export default ProtectedRoute;