import 'react-toastify/dist/ReactToastify.css'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'

import LoadingCircular from './components/common/Loading/LoadingCircular.tsx'
import LocaleProvider from './containers/LocaleProvider/index.tsx'
import MaterialProvider from './containers/MUI/index.tsx'
import PostHogProvider from './containers/PostHog/index.tsx'
import AppRouter from './containers/Router/index.tsx'
import ShadCNThemeProvider from './containers/ShadCN/index.tsx'

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
      <PostHogProvider>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </PostHogProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
