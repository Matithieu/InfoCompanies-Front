import { Box, Typography } from '@mui/joy'
import { FC } from 'react'

import ArrowButtonWithTooltip from './components/ArrowButtonWithTooltip'

type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        pt: 2,
        gap: 2,
      }}
    >
      <ArrowButtonWithTooltip
        isDisabled={page === 0}
        page={page}
        side="left"
        style={{ borderRadius: '50%' }}
        tooltipContent="Page précédente"
        onPageChange={() => onPageChange(page - 1)}
      />

      <Typography level="body-md">
        {page + 1} / {totalPages}
      </Typography>

      <ArrowButtonWithTooltip
        isDisabled={page === totalPages - 1}
        page={page}
        side="right"
        style={{ borderRadius: '50%' }}
        tooltipContent="Page suivante"
        onPageChange={() => onPageChange(page + 1)}
      />
    </Box>
  )
}

export default Pagination
