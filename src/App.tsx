import 'react-toastify/dist/ReactToastify.css'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'

import LoadingCircular from './components/common/Loading/LoadingCircular'
import ConfigurationProvider from './containers/Configuration/ConfigurationProvider'
import LocaleProvider from './containers/LocaleProvider/LocaleProvider'
import MaterialProvider from './containers/Mui/MuiProvider'
import PostHogProvider from './containers/PostHog/PostHogProvider'
import AppRouter from './containers/Router/RouterProvider'
import ShadCNThemeProvider from './containers/ShadCN/ShadCnProvider'

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

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ConfigurationProvider>
          <PostHogProvider>
            <ShadCNThemeProvider>
              <MaterialProvider>
                <LocaleProvider>
                  <HelmetProvider>
                    <Suspense fallback={<LoadingCircular />}>
                      <AppRouter />
                    </Suspense>
                  </HelmetProvider>
                </LocaleProvider>
              </MaterialProvider>
            </ShadCNThemeProvider>
          </PostHogProvider>
        </ConfigurationProvider>
      </QueryClientProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
