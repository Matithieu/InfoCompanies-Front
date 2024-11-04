import { lazy } from '@loadable/component'
import { FC } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AccountPage from '../../pages/Account/AccountPage.tsx'
import Page404 from '../../pages/Error/404.tsx'
import Test from '../../pages/Error/test.tsx'
import FavoritesPage from '../../pages/Favorites/FavoritesPage.tsx'
import LandingPage from '../../pages/Landing/LandingPage.tsx'
import Layout from '../../pages/Layout/Layout.tsx'
import LeaderPage from '../../pages/Leader/LeaderPage.tsx'
import LegalInformation from '../../pages/Legal/legal.tsx'
import PrivacyPolicy from '../../pages/Legal/privacy.tsx'
import TermsAndConditions from '../../pages/Legal/terms.tsx'
import OrderFailurePage from '../../pages/Purchasing/OrderFailurePage.tsx'
import OrderSuccessPage from '../../pages/Purchasing/OrderSuccessPage.tsx'
import CompanyPage from '../../pages/Search/Company/CompanyPage.tsx'
import SearchPage from '../../pages/Search/SearchPage.tsx'
import SettingsPage from '../../pages/Settings/SettingsPage.tsx'
import SubscriptionPage from '../../pages/Subscription/SubscriptionPage.tsx'
import { ProtectedRoutes, ProtectedSimpleRoutes } from './ProtectedRoutes.tsx'

const Dashboard = lazy(() => import('../../pages/Dashboard/DashboardPage.tsx'))

// Might want to switch to createBrowserRouter instead of BrowserRouter

const AppRouter: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/ui">
          <Route element={<LandingPage />} path="" />
          <Route element={<TermsAndConditions />} path="terms" />
          <Route element={<PrivacyPolicy />} path="privacy" />
          <Route element={<LegalInformation />} path="legal" />
          <Route element={<Test />} path="test" />

          <Route element={<ProtectedSimpleRoutes />}>
            <Route element={<SubscriptionPage />} path="subscription" />
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
              <Route element={<LeaderPage />} path="leaders/:siren" />
            </Route>
          </Route>
          <Route element={<Page404 />} path="*" />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter
