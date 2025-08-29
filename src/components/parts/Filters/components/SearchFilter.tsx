import commonMessages from '@/services/intl/common.messages'
import { formatMessage } from '@/services/intl/intl'
import { Box, Button, Typography } from '@mui/joy'
import { SearchIcon } from 'lucide-react'
import { FC } from 'react'

type SearchFilterProps = {
  handleSearch: () => void
}

export const SearchFilter: FC<SearchFilterProps> = ({ handleSearch }) => {
  return (
    <Box
      aria-label={formatMessage(commonMessages.search)}
      sx={{ flexShrink: 0, maxWidth: '250px' }}
    >
      <Button
        fullWidth
        endDecorator={<SearchIcon />}
        variant="soft"
        onClick={handleSearch}
      >
        <Typography>{formatMessage(commonMessages.search)}</Typography>
      </Button>
    </Box>
  )
}
