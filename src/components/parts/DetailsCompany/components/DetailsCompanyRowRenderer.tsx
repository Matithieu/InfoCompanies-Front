import { Tooltip, Typography } from '@mui/joy'
import { FC } from 'react'

type DetailsCompanyRowRendererProps = {
  content: string | null | undefined
  noContent: string
  oppositeContent?: string
  tooltipContent: string
  icon: JSX.Element
  style?: React.CSSProperties
  isLink?: boolean
}

const DetailsCompanyRowRenderer: FC<DetailsCompanyRowRendererProps> = ({
  content,
  noContent,
  oppositeContent,
  icon,
  tooltipContent,
  style,
  isLink,
}) => {
  const handleClick = () => {
    if (isLink && content) {
      window.open(content, '_blank')
    }
  }

  return (
    <tr style={{ border: 0 }}>
      <td scope="row">
        <span style={{ marginLeft: '10px' }} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Typography
            role={isLink ? 'button' : undefined}
            startDecorator={
              <Tooltip arrow placement="top" title={tooltipContent}>
                {icon}
              </Tooltip>
            }
            style={{ fontSize: '16px', overflow: 'hidden', ...style }}
            tabIndex={isLink ? 0 : undefined}
            onClick={handleClick}
          >
            {content ?? noContent}
          </Typography>
          {oppositeContent && (
            <Typography
              style={{ fontSize: '16px', overflow: 'hidden' }}
              textColor="#808080"
            >
              {oppositeContent}
            </Typography>
          )}
        </div>
      </td>
    </tr>
  )
}

export default DetailsCompanyRowRenderer
