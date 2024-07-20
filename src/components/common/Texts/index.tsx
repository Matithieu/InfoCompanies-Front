import { Typography } from '@mui/material'
import { FC } from 'react'

export const PleaseSelectACompanyText: FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h6">Veuillez sélectionner une entreprise</Typography>
    </div>
  )
}
