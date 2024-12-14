import commonMessages from '@/services/intl/common.messages'
import { formatMessage } from '@/services/intl/intl'
import { Typography } from '@mui/material'
import { FC } from 'react'

const NoCompaniesFound: FC = () => {
  return (
    <div
      style={{
        marginRight: 'auto',
      }}
    >
      <Typography style={{ marginTop: 20 }} variant="h4">
        {formatMessage(commonMessages.noCompaniesFound)}
      </Typography>
    </div>
  )
}

export default NoCompaniesFound
