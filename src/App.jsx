import React from 'react';
import Dashboard from './pages/Dashboard/dashboard';
import Favorites from './pages/Favorites/favorites'; // Import other page components if needed
import Settings from './pages/Settings/settings';
import Account from './pages/Account/account';
import Search from './pages/Search/search';
import Company from './pages/Company/company';
import Leader from './pages/Leaders/leaders';
import Error404 from './pages/404/Account/404';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import LoginPage from './pages/Login/login';
import ProtectedRoute from './utils/protectedRoute.tsx'
import { CompanyProvider } from './context/CompanyContext.tsx';


function App() {
  return (
    <HelmetProvider>
      <CompanyProvider>

        <Routes>
          <Route path="/login" element={<LoginPage />} />
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
        
      </CompanyProvider>
    </HelmetProvider>
  );
}

export default App;
