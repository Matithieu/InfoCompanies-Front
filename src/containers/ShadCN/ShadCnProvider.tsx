import { FC } from 'react'

import { ShadCNTheme } from './ThemeProvider'

type ShadCNThemeProviderProps = {
  children: React.ReactNode
}

const ShadCNThemeProvider: FC<ShadCNThemeProviderProps> = ({ children }) => {
  return (
    <ShadCNTheme defaultTheme="light" storageKey="infocp-shadcn-ui-theme">
      {children}
    </ShadCNTheme>
  )
}

export default ShadCNThemeProvider
