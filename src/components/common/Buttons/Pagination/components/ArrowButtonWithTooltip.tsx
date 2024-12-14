import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { IconButton } from '@mui/joy'
import { Tooltip } from '@mui/material'

type ArrowButtonProps = {
  side: 'left' | 'right'
  page: number
  isDisabled: boolean
  tooltipContent: string
  style?: React.CSSProperties
  onPageChange: (page: number) => void
}

const ArrowButtonWithTooltip = ({
  isDisabled,
  side,
  page,
  tooltipContent,
  style,
  onPageChange,
}: ArrowButtonProps) => {
  const ButtonToRender =
    side === 'left' ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />

  return (
    <Tooltip title={tooltipContent}>
      <div>
        <IconButton
          color="neutral"
          disabled={isDisabled}
          size="sm"
          sx={{ bgcolor: 'background.surface', ...style }}
          variant="outlined"
          onClick={() => onPageChange(page)}
        >
          {ButtonToRender}
        </IconButton>
      </div>
    </Tooltip>
  )
}

export default ArrowButtonWithTooltip
