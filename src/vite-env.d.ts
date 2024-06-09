/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_STRIPE_PUBLIC_KEY: string
  VITE_STRIPE_SECRET_KEY: string

  VITE_FRONTEND_URL: string

  VITE_PROXY_BASE_URL: string
  VITE_PROXY_PORT: string

  VITE_OAUTH_BASE_URL: string
  VITE_OAUTH_SIGNIN_URL: string
  VITE_OAUTH_SIGNOUT_URL: string
  VITE_OAUTH_SIGNIN_REDIRECT_URL: string
  VITE_OAUTH_SIGNOUT_REDIRECT_URL: string

  VITE_API_BASE_URL: string
  VITE_API_PREFIX: string
  VITE_API_BASE_V1_URL: string
  VITE_API_COMPANY_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
