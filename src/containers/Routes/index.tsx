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
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'

import ToastProvider from '../Toast/index.tsx'
import { ProtectedRoutes, ProtectedSimpleRoutes } from './ProtectedRoutes.tsx'

const Dashboard = lazy(() => import('@/pages/Dashboard/DashboardPage.tsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate replace to="/ui" />,
  },
  {
    path: '/ui',
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'terms', element: <TermsAndConditions /> },
      { path: 'privacy', element: <PrivacyPolicy /> },
      { path: 'legal', element: <LegalInformation /> },
      { path: 'test', element: <TestPage /> },
      {
        element: <ProtectedSimpleRoutes />,
        children: [
          { path: 'failure', element: <OrderFailurePage /> },
          { path: 'completion', element: <OrderSuccessPage /> },
        ],
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            element: <Layout />,
            children: [
              { path: 'dashboard', element: <Dashboard /> },
              { path: 'favorites', element: <FavoritesPage /> },
              { path: 'settings', element: <SettingsPage /> },
              { path: 'account', element: <AccountPage /> },
              { path: 'search/:searchTerm', element: <SearchPage /> },
              { path: 'company/:companyId', element: <CompanyPage /> },
              { path: 'leaders/:siren', element: <LeaderPage /> },
            ],
          },
        ],
      },
      { path: '*', element: <Page404 /> },
    ],
  },
])

const AppRouter: FC = () => {
  return (
    <>
      <RouterProvider router={router} />
      {/* ToastProvider has useAppNavigate inside, so it needs to be here */}
      <ToastProvider />
    </>
  )
}

export default AppRouter
