import { Suspense } from "react"
import { HelmetProvider } from "react-helmet-async"
import { Route, Routes } from "react-router-dom"
import { lazy } from "@loadable/component"

import Error401 from "./pages/Error/401.tsx"
import Error404 from "./pages/Error/404.tsx"
import Test from "./pages/Error/test.tsx"
import Landing from "./pages/Landing/index.tsx"
import Layout from "./pages/Layout/index.tsx"
import Loading from "./pages/Loading/index.tsx"
import Failure from "./pages/Purchasing/failure.tsx"
import ViewInvoices from "./pages/Purchasing/invoice.tsx"
import OrderConfirmation from "./pages/Purchasing/success.tsx"
import Payment from "./pages/Stripe/index.tsx"
import Subscription from "./pages/Subscription/index.tsx"
import {
  ProtectedRoutes,
  ProtectedSimpleRoutes,
} from "./utils/protectedRoute.tsx"

// Lazy loading components for security
const Dashboard = lazy(() => import("./pages/Dashboard/index.tsx"))
const Favorites = lazy(() => import("./pages/Favorites/index.tsx"))
const Settings = lazy(() => import("./pages/Settings/index.tsx"))
const Account = lazy(() => import("./pages/Account/index.tsx"))
const Search = lazy(() => import("./pages/Search/index.tsx"))
const Company = lazy(() => import("./pages/Search/Company/index.tsx"))
const Leader = lazy(() => import("./pages/Leaders/index.tsx"))
const FakeLoading = lazy(() => import("./pages/Loading/loginLoading.tsx"))

function App() {
  return (
    <HelmetProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<Landing />} path="/" />
          <Route element={<Test />} path="/test" />
          <Route element={<FakeLoading />} path="/loading" />
          <Route element="/error">
            <Route element={<Error404 />} path="*/" />
            <Route element={<Error401 />} path="/not-found" />
          </Route>
          z
          <Route element={<ProtectedSimpleRoutes />}>
            <Route element={<Subscription />} path="/subscription" />
            <Route element={<Payment />} path="/stripe" />
            <Route element={<Failure />} path="/failure" />
            <Route element={<OrderConfirmation />} path="/completion" />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route element={<ViewInvoices />} path="/invoices" />

            <Route element={<Layout />}>
              <Route element={<Dashboard />} path="/dashboard" />
              <Route element={<Favorites />} path="/favorites" />
              <Route element={<Settings />} path="/settings" />
              <Route element={<Account />} path="/account" />
              <Route element={<Search />} path="/search/:searchTerm" />
              <Route element={<Company />} path="/company/*" />
              <Route element={<Leader />} path="/leaders/*" />
              <Route element={<Error404 />} path="/*" />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </HelmetProvider>
  )
}

export default App
