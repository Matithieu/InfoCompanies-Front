import AccountPage from '@/pages/Account/AccountPage.tsx'
import Page404 from '@/pages/Error/404.tsx'
import FavoritesPage from '@/pages/Favorites/FavoritesPage.tsx'
import LandingPage from '@/pages/Landing/LandingPage.tsx'
import Layout from '@/pages/Layout/Layout.tsx'
import LeaderPage from '@/pages/Leader/LeaderPage.tsx'
import LegalInformation from '@/pages/Legal/legal.tsx'
import PrivacyPolicy from '@/pages/Legal/privacy.tsx'
import TermsAndConditions from '@/pages/Legal/terms.tsx'
import OrderFailurePage from '@/pages/Purchasing/OrderFailurePage.tsx'
import OrderSuccessPage from '@/pages/Purchasing/OrderSuccessPage.tsx'
import CompanyPage from '@/pages/Search/Company/CompanyPage.tsx'
import SearchPage from '@/pages/Search/SearchPage.tsx'
import SettingsPage from '@/pages/Settings/SettingsPage.tsx'
import TestPage from '@/pages/Test/TestPage.tsx'
import { lazy } from '@loadable/component'
import { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

import ToastProvider from '../Toast/index.tsx'
import { ProtectedRoutes, ProtectedSimpleRoutes } from './ProtectedRoutes.tsx'

const Dashboard = lazy(() => import('@/pages/Dashboard/DashboardPage.tsx'))

const AppRouter: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Navigate replace to="/ui" />} path="/" />
          <Route path="/ui">
            <Route index element={<LandingPage />} />
            <Route element={<TermsAndConditions />} path="terms" />
            <Route element={<PrivacyPolicy />} path="privacy" />
            <Route element={<LegalInformation />} path="legal" />
            <Route element={<TestPage />} path="test" />

            <Route element={<ProtectedSimpleRoutes />}>
              <Route element={<OrderFailurePage />} path="failure" />
              <Route element={<OrderSuccessPage />} path="completion" />
            </Route>

            <Route element={<ProtectedRoutes />}>
              <Route element={<Layout />}>
                <Route element={<Dashboard />} path="dashboard" />
                <Route element={<FavoritesPage />} path="favorites" />
                <Route element={<SettingsPage />} path="settings" />
                <Route element={<AccountPage />} path="account" />
                <Route element={<SearchPage />} path="search/:searchTerm" />
                <Route element={<CompanyPage />} path="company/:companyId" />
                <Route element={<LeaderPage />} path="leader/:id" />
              </Route>
            </Route>

            <Route element={<Page404 />} path="*" />
          </Route>
        </Routes>

        {/* ToastProvider has useAppNavigate inside to it needs to be there */}
        <ToastProvider />
      </BrowserRouter>
    </>
  )
}

export default AppRouter
