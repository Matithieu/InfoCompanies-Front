import "react-toastify/dist/ReactToastify.css"
import "./index.css"

import React from "react"
import ReactDOM from "react-dom/client"
import { AuthProvider } from "react-oidc-context"
import { BrowserRouter as Router } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { CssBaseline, CssVarsProvider } from "@mui/joy"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { OidcClientSettings } from "oidc-client-ts"

import { fontFamily } from "./pages/Layout/utils.js"
import App from "./App.jsx"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
    mutations: {
      retry: false,
    },
  },
})

const oidcConfig: OidcClientSettings = {
  authority: "http://localhost:8180/realms/infoCompanies",
  client_id: "spring-ba-infocompanies",
  response_type: "code",
  redirect_uri: "http://localhost:5173/loading",
  post_logout_redirect_uri: "http://localhost:5173/",
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <CssVarsProvider theme={fontFamily}>
            <CssBaseline />
            <App />
            <ToastContainer
              closeOnClick
              draggable
              pauseOnFocusLoss
              pauseOnHover
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              position="top-right"
              rtl={false}
            />
          </CssVarsProvider>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
)
