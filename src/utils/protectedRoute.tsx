import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import Loading from '../pages/Loading';
import { User } from '../data/user';

const ProtectedRoute: React.FC = () => {
  const { authUser, requestLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
      navigate('/login');
      return;
    }

    if (!(authUser instanceof User && typeof authUser.getVerified === 'function')) {
      navigate('/login');
      return;
    }

    const isVerified = authUser.getVerified();
    const path = window.location.pathname;

    const paymentPaths = ['/subscription', '/stripe', '/failure', '/invoices'];

    if (paymentPaths.includes(path)) {
      // Gérer les redirections pour les pages de paiement
      navigate(isVerified ? '/dashboard' : '/subscription');
    } else if (!isVerified) {
      // Si l'utilisateur n'est pas vérifié et essaie d'accéder à une page protégée, rediriger vers la page de paiement
      navigate('/subscription');
    }

  }, [authUser, navigate]);

  if (requestLoading) {
    return <Loading />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
