import { Input } from '@/components/ui/input'
import { FormHelperText } from '@mui/joy'
import { FC, FormEvent, useState } from 'react'

import commonMessages from '../../../services/intl/common.messages'
import { formatMessage } from '../../../services/intl/intl'
import { useAppNavigate } from '../../../utils/navigation/navigation'

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
        placeholder={'🔍' + ' ' + formatMessage(commonMessages.search)}
        style={{
          borderColor: isSearchBarError ? 'red' : 'hsl(var(--primary))', // Conditionally apply red border
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
