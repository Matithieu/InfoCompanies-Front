import { Tooltip } from '@mui/material'
import { FC } from 'react'

import { formatMessage } from '../../../../../services/intl/intl'
import tableCompanyMessages from '../../tableCompany.messages'

type CellContentTooltipProps = {
  content: string | undefined
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
      enterDelay={500}
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
          display: 'block',
          width: '100%',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        onClick={(e) => {
          if (content) {
            e.stopPropagation()
            onContentClick(content)
          }
        }}
      >
        {content ?? '-'}
      </span>
    </Tooltip>
  )
}

export default CellContentTooltip
