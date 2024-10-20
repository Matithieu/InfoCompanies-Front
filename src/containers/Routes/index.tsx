import { lazy } from '@loadable/component'
import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import AccountPage from '../../pages/Account/index.tsx'
import Page404 from '../../pages/Error/404.tsx'
import Test from '../../pages/Error/test.tsx'
import Favorites from '../../pages/Favorites/index.tsx'
import LandingPage from '../../pages/Landing/index.tsx'
import Layout from '../../pages/Layout/index.tsx'
import LeaderPage from '../../pages/Leaders/index.tsx'
import LegalInformation from '../../pages/Legal/legal.tsx'
import PrivacyPolicy from '../../pages/Legal/privacy.tsx'
import TermsAndConditions from '../../pages/Legal/terms.tsx'
import Failure from '../../pages/Purchasing/failure.tsx'
import OrderConfirmation from '../../pages/Purchasing/success.tsx'
import CompanyPage from '../../pages/Search/Company/index.tsx'
import SearchPage from '../../pages/Search/index.tsx'
import SettingsPage from '../../pages/Settings/index.tsx'
import Payment from '../../pages/Stripe/index.tsx'
import SubscriptionPage from '../../pages/Subscription/index.tsx'
import { ProtectedRoutes, ProtectedSimpleRoutes } from './ProtectedRoutes.tsx'

const Dashboard = lazy(() => import('../../pages/Dashboard/index.tsx'))

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/ui">
        <Route element={<LandingPage />} path="" />
        <Route element={<TermsAndConditions />} path="terms" />
        <Route element={<PrivacyPolicy />} path="privacy" />
        <Route element={<LegalInformation />} path="legal" />
        <Route element={<Test />} path="test" />

        <Route element={<ProtectedSimpleRoutes />}>
          <Route element={<SubscriptionPage />} path="subscription" />
          <Route element={<Payment />} path="stripe" />
          <Route element={<Failure />} path="failure" />
          <Route element={<OrderConfirmation />} path="completion" />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route element={<Dashboard />} path="dashboard" />
            <Route element={<Favorites />} path="favorites" />
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
  )
}

export default AppRouter
