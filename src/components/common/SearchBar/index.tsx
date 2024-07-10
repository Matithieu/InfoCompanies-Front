import SearchIcon from '@mui/icons-material/Search'
import { Input } from '@mui/joy'
import { useState } from 'react'

import { useAppNavigate } from '../../../utils/navigation/navigation'

export default function SearchAppBar() {
  const { navigation } = useAppNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (searchTerm.trim() !== '') {
      navigation.toSearch(searchTerm)
    }
  }

  return (
    <form onSubmit={handleSearch}>
      <Input
        endDecorator={<SearchIcon />}
        placeholder="Rechercher une entreprise"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  )
}
