import { Tooltip, Typography } from '@mui/joy'

type DetailsCompanyRowProps = {
  content: string
  noContent: string
  tooltipContent: string
  icon: JSX.Element
  style?: React.CSSProperties
  isLink?: boolean
}

export default function DetailsCompanyRow({
  content,
  noContent,
  icon,
  tooltipContent,
  style,
  isLink,
}: DetailsCompanyRowProps) {
  const handleClick = () => {
    if (isLink && content) {
      window.open(content, '_blank')
    }
  }

  return (
    <tr style={{ border: 0 }}>
      <td scope="row">
        <span style={{ marginLeft: '10px' }}></span>
        <Typography
          role={isLink ? 'button' : undefined}
          startDecorator={
            <Tooltip arrow placement="top" title={tooltipContent}>
              {icon}
            </Tooltip>
          }
          style={{ fontSize: '18px', overflow: 'hidden', ...style }}
          tabIndex={isLink ? 0 : undefined}
          onClick={handleClick}
        >
          {content ?? noContent}
        </Typography>
      </td>
    </tr>
  )
}
