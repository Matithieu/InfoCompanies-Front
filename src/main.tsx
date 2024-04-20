import { CssBaseline, CssVarsProvider } from "@mui/joy"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { AuthProvider } from "react-oidc-context"

import "react-toastify/dist/ReactToastify.css"
import App from "./App.jsx"
import "./index.css"
import { fontFamily } from "./pages/Layout/utils.js"
import { OidcClientSettings } from "oidc-client-ts"

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
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </CssVarsProvider>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
)
