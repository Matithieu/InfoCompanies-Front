import { Tooltip } from '@mui/joy'
import { FC } from 'react'

import { formatMessage } from '../../../../../services/intl/intl'
import tableCompanyMessages from '../../tableCompany.messages'

type CellContentTooltipProps = {
  content: string
  isCopyEnabled?: boolean
  onContentClick: (content: string) => void
}

const CellContentTooltip: FC<CellContentTooltipProps> = ({
  content,
  isCopyEnabled = false,
  onContentClick,
}) => {
  return (
    <Tooltip
      title={(() => {
        if (!content) return null

        return formatMessage(
          isCopyEnabled
            ? tableCompanyMessages.clickToCopyToClipboard
            : tableCompanyMessages.clickToOpenInNewTab,
        )
      })()}
    >
      <span
        style={{
          cursor: 'pointer',
          color: content ? 'inherit' : '#808080',
          textDecoration: content && !isCopyEnabled ? 'underline' : 'none',
        }}
        onClick={(e) => {
          if (!content) return

          e.stopPropagation()
          onContentClick(content)
        }}
      >
        {content ?? '-'}
      </span>
    </Tooltip>
  )
}

export default CellContentTooltip
