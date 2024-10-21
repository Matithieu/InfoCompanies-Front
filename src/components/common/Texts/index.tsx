import { Typography } from '@mui/material'
import { FC } from 'react'

import { formatMessage } from '../../../services/intl/intl'
import textsMessages from './texts.messages'

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
      <Typography variant="h6">
        {formatMessage(textsMessages.pleaseSelectACompany)}
      </Typography>
    </div>
  )
}
