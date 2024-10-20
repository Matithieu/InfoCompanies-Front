import 'react-toastify/dist/ReactToastify.css'
import './index.css'

import { CssBaseline, CssVarsProvider } from '@mui/joy'
import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as materialExtendTheme,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { Suspense, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import LoadingCircular from './components/common/Loading/LoadingCircular.tsx'
import LocaleProvider from './containers/LocaleProvider/index.tsx'
import AppRouter from './containers/Routes/index.tsx'
import { fontFamily } from './pages/Layout/layout.util.ts'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 0,
    },
    mutations: {
      retry: 0,
    },
  },
})

const materialTheme = materialExtendTheme()

function App() {
  useEffect(() => {
    if (window.location.pathname === '/') {
      window.location.href = '/ui'
    }
  }, [])

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router>
          <MaterialCssVarsProvider
            theme={{ [MATERIAL_THEME_ID]: materialTheme }}
          >
            <CssVarsProvider theme={fontFamily}>
              <CssBaseline />
              <LocaleProvider>
                <HelmetProvider>
                  <Suspense fallback={<LoadingCircular />}>
                    <AppRouter />
                  </Suspense>
                </HelmetProvider>
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
              </LocaleProvider>
            </CssVarsProvider>
          </MaterialCssVarsProvider>
        </Router>
      </QueryClientProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
