import commonMessages from '@/services/intl/common.messages'
import { formatMessage } from '@/services/intl/intl'
import { Typography } from '@mui/material'
import { FC } from 'react'

const NoCompaniesFound: FC = () => {
  return (
    <Typography style={{ marginTop: 20 }} variant="h4">
      {formatMessage(commonMessages.noCompaniesFound)}
    </Typography>
  )
}

export default NoCompaniesFound
