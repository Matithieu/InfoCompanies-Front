import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Landing from './pages/Landing/Component/index.tsx';
import LoginPage from './pages/Login/login';
import RegisterPage from './pages/Register/register';
import Error404 from './pages/404/Account/404';
import LoadingPage from './pages/Loading/loading.tsx';
import ProtectedRoute from './utils/protectedRoute.tsx';
import Payment from './pages/Stripe/Payment/index.jsx';

// Lazy loading components for security
const Dashboard = React.lazy(() => import('./pages/Dashboard/dashboard'));
const Favorites = React.lazy(() => import('./pages/Favorites/favorites'));
const Settings = React.lazy(() => import('./pages/Settings/settings'));
const Account = React.lazy(() => import('./pages/Account/account'));
const Search = React.lazy(() => import('./pages/Search/search'));
const Company = React.lazy(() => import('./pages/Company/company'));
const Leader = React.lazy(() => import('./pages/Leaders/leader'));

function App() {
  return (
    <HelmetProvider>
      <Suspense fallback={<LoadingPage/>}>

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/stripe" element={<Payment />} />
          <Route path="/completion" element={"Thank you for purshasing"} />
          <Route path="*" element={<Error404 />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/account" element={<Account />} />
            <Route path="/search/*" element={<Search />} />
            <Route path="/company/*" element={<Company />} />
            <Route path="/leaders/*" element={<Leader />} />
          </Route>

        </Routes>
      </Suspense>
    </HelmetProvider>
  );
}

export default App;
