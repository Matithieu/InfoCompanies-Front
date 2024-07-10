import 'react-toastify/dist/ReactToastify.css'
import './index.css'

import { CssBaseline, CssVarsProvider } from '@mui/joy'
import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as materialExtendTheme,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import App from './App.jsx'
import { fontFamily } from './pages/Layout/utils.js'

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

const materialTheme = materialExtendTheme()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
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
        </MaterialCssVarsProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
)
