/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_STRIPE_PUBLIC_KEY: string
  VITE_STRIPE_SECRET_KEY: string

  VITE_FRONTEND_URL: string
  VITE_FRONTEND_REDIRECT_AFTER_LOGIN: string
  VITE_KEYCLOAK_REDIRECT_LOGIN_URL: string

  VITE_API_BASE_URL: string
  VITE_API_BASE_V1_URL: string
  VITE_API_COMPANY_ENDPOINT: string

  VITE_KEYCLOAK_URL: string
  VITE_KEYCLOAK_REALM: string
  VITE_KEYCLOAK_CLIENT_ID: string
  VITE_KEYCLOAK_AUTHORITY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
