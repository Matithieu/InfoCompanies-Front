import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Landing from './pages/Landing/index.tsx';
import LoginPage from './pages/Login/index.tsx';
import RegisterPage from './pages/Register/index.tsx';
import Error404 from './pages/404/index.tsx';
import Loading from './pages/Loading/index.tsx';
import ProtectedRoute from './utils/protectedRoute.tsx';
import Payment from "./pages/Stripe/index.tsx"
import Layout from "./pages/Layout/index.tsx";
import PurchaseSuccessPage from './pages/Purchasing/index.tsx';

// Lazy loading components for security
const Dashboard = React.lazy(() => import('./pages/Dashboard/index.tsx'));
const Favorites = React.lazy(() => import('./pages/Favorites/index.tsx'));
const Settings = React.lazy(() => import('./pages/Settings/index.tsx'));
const Account = React.lazy(() => import('./pages/Account/index.tsx'));
const Search = React.lazy(() => import('./pages/Search/index.tsx'));
const Company = React.lazy(() => import('./pages/Company/index.tsx'));
const Leader = React.lazy(() => import('./pages/Leaders/index.tsx'));

function App() {
  return (
    <HelmetProvider>
      <Suspense fallback={<Loading />}>

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/stripe" element={<Payment />} />
          <Route path="/completion" element={<PurchaseSuccessPage/>} />
          <Route path="*/" element={<Error404 />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/account" element={<Account />} />
              <Route path="/search/*" element={<Search />} />
              <Route path="/company/*" element={<Company />} />
              <Route path="/leaders/*" element={<Leader />} />
              <Route path="/*" element={<Error404 />} />
            </Route>
          </Route>
        </Routes>

      </Suspense>
    </HelmetProvider>
  );
}

export default App;
