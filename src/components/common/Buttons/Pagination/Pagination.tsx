import { Page } from '@/types/index.types'
import { Box, Typography } from '@mui/joy'
import { FC } from 'react'

import ArrowButtonWithTooltip from './components/ArrowButtonWithTooltip'

type PaginationProps = {
  pageNumber: number
  totalPages: number
  onPageChange: (newPage: Page) => void
}

const Pagination: FC<PaginationProps> = ({
  pageNumber,
  totalPages,
  onPageChange,
}) => {
  const pageNumberDisplayed = pageNumber + 1

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
        gap: 2,
      }}
    >
      <ArrowButtonWithTooltip
        isDisabled={pageNumber === 0}
        page={pageNumber}
        side="left"
        style={{ borderRadius: '50%' }}
        tooltipContent="Page précédente"
        onPageChange={() => onPageChange({ page: pageNumber - 1, totalPages })}
      />

      <Typography level="body-md">
        {totalPages === 0 ? pageNumber : pageNumberDisplayed} / {totalPages}
      </Typography>

      <ArrowButtonWithTooltip
        isDisabled={pageNumberDisplayed === totalPages || totalPages === 0}
        page={pageNumber}
        side="right"
        style={{ borderRadius: '50%' }}
        tooltipContent="Page suivante"
        onPageChange={() => onPageChange({ page: pageNumber + 1, totalPages })}
      />
    </Box>
  )
}

export default Pagination
