import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { Box, iconButtonClasses, Tooltip, Typography } from '@mui/joy'
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
            display: 'flex',
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
              <Button
                disabled={dataPagination.page === 0}
                size="icon"
                variant="outline"
                onClick={() => handleChangePage(dataPagination.page - 1)}
              >
                <Icon
                  className="text-primary"
                  color="hsl(var(--primary))"
                  name="ChevronLeft"
                  size={24}
                />{' '}
              </Button>
            </Tooltip>
            <Typography level="body-md">
              {dataPagination.page + 1} / {dataPagination.totalPages}
            </Typography>
            <Tooltip title="Page suivante">
              <Button
                disabled={dataPagination.page === dataPagination.totalPages - 1}
                size="icon"
                variant="outline"
                onClick={() => handleChangePage(dataPagination.page + 1)}
              >
                <Icon
                  className="text-primary"
                  color="hsl(var(--primary))"
                  name="ChevronRight"
                  size={24}
                />
              </Button>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  )
}
