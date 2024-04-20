import { lazy } from "@loadable/component"
import { Suspense } from "react"
import { HelmetProvider } from "react-helmet-async"
import { Route, Routes } from "react-router-dom"

import Error401 from "./pages/Error/401.tsx"
import Error404 from "./pages/Error/404.tsx"
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
import Test from "./pages/Error/test.tsx"

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
          <Route path="/" element={<Landing />} />
          <Route path="/test" element={<Test />} />
          <Route path="/loading" element={<FakeLoading />} />
          <Route element="/error">
            <Route path="*/" element={<Error404 />} />
            <Route path="/not-found" element={<Error401 />} />
          </Route>
          z
          <Route element={<ProtectedSimpleRoutes />}>
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/stripe" element={<Payment />} />
            <Route path="/failure" element={<Failure />} />
            <Route path="/completion" element={<OrderConfirmation />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/invoices" element={<ViewInvoices />} />

            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/account" element={<Account />} />
              <Route path="/search/:searchTerm" element={<Search />} />
              <Route path="/company/*" element={<Company />} />
              <Route path="/leaders/*" element={<Leader />} />
              <Route path="/*" element={<Error404 />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </HelmetProvider>
  )
}

export default App
