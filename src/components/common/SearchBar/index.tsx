import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { FormHelperText, Input } from '@mui/joy'
import { FC, FormEvent, useState } from 'react'

import { useAppNavigate } from '../../../hooks/useAppNavigate'
import commonMessages from '../../../services/intl/common.messages'
import { formatMessage } from '../../../services/intl/intl'

type SearchAppBarProps = {
  isSidebarOpen: boolean
}

const SearchAppBar: FC<SearchAppBarProps> = ({ isSidebarOpen }) => {
  const { navigation } = useAppNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchBarError, setIsSearchBarError] = useState(false)

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (searchTerm.trim() !== '' && !searchTerm.includes('/')) {
      const sanitizedSearchTerm = searchTerm.replace(/[^\w\sÀ-ÿ]/g, '') // Remove all non-alphanumeric characters except spaces and accented characters

      if (sanitizedSearchTerm !== searchTerm) {
        setIsSearchBarError(true)
      } else {
        setIsSearchBarError(false)
        navigation.toSearch(sanitizedSearchTerm)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)

    // Check if there are any special characters in the search term
    if (/[^\w\sÀ-ÿ]/g.test(e.target.value)) {
      setIsSearchBarError(true)
    } else {
      setIsSearchBarError(false)
    }
  }

  return (
    <form onSubmit={handleSearch}>
      <Input
        error={isSearchBarError} // Apply error state to input
        placeholder={formatMessage(commonMessages.search)}
        size="md"
        startDecorator={<SearchRoundedIcon />}
        sx={{
          borderColor: isSearchBarError ? 'red' : undefined, // Conditionally apply red border
        }}
        value={searchTerm}
        onChange={handleInputChange}
      />
      <div style={{ position: 'absolute' }}>
        {isSearchBarError && isSidebarOpen ? (
          <FormHelperText sx={{ color: 'red' }}>
            {formatMessage(commonMessages.noSpecialCharacters)}
          </FormHelperText>
        ) : null}
      </div>
    </form>
  )
}

export default SearchAppBar
