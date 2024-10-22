import { Tooltip } from '@mui/joy'
import { FC } from 'react'

import { formatMessage } from '../../../../../services/intl/intl'
import tableCompanyMessages from '../../tableCompany.messages'

type CellContentTooltipProps = {
  content: string
  copyToClipboard?: boolean
  handleFunction: (content: string) => void
}

const CellContentTooltip: FC<CellContentTooltipProps> = ({
  content,
  copyToClipboard = false,
  handleFunction,
}) => {
  return (
    <Tooltip
      title={(() => {
        if (!content) return null
        return copyToClipboard
          ? formatMessage(tableCompanyMessages.clickToCopyToClipboard)
          : formatMessage(tableCompanyMessages.clickToOpenInNewTab)
      })()}
    >
      <span
        style={{
          cursor: 'pointer',
          color: content ? 'inherit' : '#808080',
          textDecoration: content && !copyToClipboard ? 'underline' : 'none',
        }}
        onClick={(e) => {
          if (!content) return
          e.stopPropagation()
          handleFunction(content)
        }}
      >
        {content ?? 'N/A'}
      </span>
    </Tooltip>
  )
}

export default CellContentTooltip
