import { CssBaseline, CssVarsProvider } from '@mui/joy'
import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as materialExtendTheme,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles'
import { FC, ReactNode } from 'react'

import { fontFamily } from '../../pages/Layout/layout.util'

type MaterialProviderProps = {
  children: ReactNode
}

const materialTheme = materialExtendTheme()

const MaterialProvider: FC<MaterialProviderProps> = ({ children }) => {
  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <CssVarsProvider theme={fontFamily}>
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </MaterialCssVarsProvider>
  )
}

export default MaterialProvider
