import {
  Box,
  IconButton,
  iconButtonClasses,
  Tooltip,
  Typography,
} from '@mui/joy'

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import React from 'react'

type DataPaginationProps = {
  dataPagination: {
    page: number
    totalPages: number
  }
  handleChangePage: (page: number) => void
}

export default function Pagination({
  dataPagination,
  handleChangePage,
}: DataPaginationProps) {
  return (
    <React.Fragment>
      <Box>
        <Box
          sx={{
            pt: 2,
            gap: 1,
            [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
            display: {
              xs: 'none',
              md: 'flex',
            },
          }}
        >
          <Box
            sx={{
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Tooltip title="Page précédente">
              <IconButton
                color="neutral"
                disabled={dataPagination.page === 0}
                size="sm"
                sx={{ bgcolor: 'background.surface' }}
                variant="outlined"
                onClick={() => handleChangePage(dataPagination.page - 1)}
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
            </Tooltip>
            <Typography level="body-md">
              {dataPagination.page + 1} / {dataPagination.totalPages}
            </Typography>
            <Tooltip title="Page suivante">
              <IconButton
                color="neutral"
                disabled={dataPagination.page === dataPagination.totalPages - 1}
                size="sm"
                sx={{ bgcolor: 'background.surface' }}
                variant="outlined"
                onClick={() => handleChangePage(dataPagination.page + 1)}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}
