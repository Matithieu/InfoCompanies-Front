import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import Loading from '../pages/Loading';
import { User } from '../data/user';

const ProtectedRoute: React.FC = () => {
  const { authUser, requestLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Rediriger l'utilisateur en fonction de son état de vérification
    if (authUser !== null && authUser instanceof User) {
      if (typeof authUser.getVerified === 'function') {
        if (authUser.getVerified() === false) {
          // Si l'utilisateur n'est pas vérifié, rediriger vers Stripe
          navigate('/stripe');
        } else if (window.location.pathname === '/stripe') {
          // Si l'utilisateur est vérifié et essaie d'accéder à Stripe, rediriger vers le tableau de bord
          navigate('/dashboard');
        }
      }
    } else if (authUser === null) {
      // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
      navigate('/login');
    }
  }, [authUser, navigate]);

  if (requestLoading) {
    return <Loading />;
  }

  return authUser ? <Outlet /> : <Navigate to="/login" />;
};


export default ProtectedRoute;
