import commonMessages from '@/services/intl/common.messages'
import { FC } from 'react'

import { formatMessage } from '../../../../services/intl/intl'
import { NoAvailableText } from './components/NoAvailableText'

export const NoAvailableDataText: FC = () => {
  return (
    <NoAvailableText message={formatMessage(commonMessages.noAvailableData)} />
  )
}

export const NoAvailableLeaderText: FC = () => {
  return (
    <NoAvailableText message={formatMessage(commonMessages.noLeadersFound)} />
  )
}
