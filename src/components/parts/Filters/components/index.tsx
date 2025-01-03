import columnsMessages from '@/data/types/Columns/columns.messages'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Button, Switch, Typography } from '@mui/joy'

import commonMessages from '../../../../services/intl/common.messages'
import { formatMessage } from '../../../../services/intl/intl'
import { SearchParams } from '../../../../stores/filtersStore'
import { fetchAutoComplete } from '../../../../utils/api/queries'
import FetchAutoComplete from '../../../common/AutoComplete/FetchAutoComplete'
import ComparatorInput from '../../../common/Input/ComparatorInput'
import { SelectedFilterType } from '../filter.type'
import ContactFilter from './ContactFilter'
import SocialsFilter from './SocialsFilter'

const getFilterComponents = (
  searchTerm: SearchParams,
  handleSelectChange: (
    field: keyof SearchParams,
  ) => (selectedValue: SelectedFilterType) => void,
  handleSearch: () => void,
) => ({
  legalForm: (
    <Box
      aria-label={formatMessage(commonMessages.legalForm)}
      sx={{ flexShrink: 0, maxWidth: '250px' }}
    >
      <FetchAutoComplete
        fetchFunction={(searchTerm) =>
          fetchAutoComplete('legal-form', searchTerm)
        }
        handleSelectChange={handleSelectChange('legalForm')}
        inputLabel={formatMessage(commonMessages.legalForm)}
        isLabelHidden={searchTerm.legalForm.length > 0}
        queryKeyBase="legal-form"
        value={searchTerm.legalForm}
      />
    </Box>
  ),
  industrySector: (
    <Box
      aria-label={formatMessage(commonMessages.industrySector)}
      sx={{ flexShrink: 0, maxWidth: '250px' }}
    >
      <FetchAutoComplete
        fetchFunction={(searchTerm) =>
          fetchAutoComplete('industry-sector', searchTerm)
        }
        handleSelectChange={handleSelectChange('industrySector')}
        inputLabel={formatMessage(commonMessages.industrySector)}
        isLabelHidden={searchTerm.industrySector.length > 0}
        queryKeyBase="industry-sector"
        value={searchTerm.industrySector}
      />
    </Box>
  ),
  region: (
    <Box
      aria-label={formatMessage(commonMessages.region)}
      sx={{ flexShrink: 0, maxWidth: '250px' }}
    >
      <FetchAutoComplete
        fetchFunction={(searchTerm) => fetchAutoComplete('region', searchTerm)}
        handleSelectChange={handleSelectChange('region')}
        inputLabel={formatMessage(commonMessages.region)}
        isLabelHidden={searchTerm.region.length > 0}
        queryKeyBase="regions"
        value={searchTerm.region}
      />
    </Box>
  ),
  city: (
    <Box
      aria-label={formatMessage(commonMessages.city)}
      sx={{ flexShrink: 0, maxWidth: '250px' }}
    >
      <FetchAutoComplete
        fetchFunction={(searchTerm) => fetchAutoComplete('city', searchTerm)}
        handleSelectChange={handleSelectChange('city')}
        inputLabel={formatMessage(commonMessages.city)}
        isLabelHidden={searchTerm.city.length > 0}
        queryKeyBase="cities"
        value={searchTerm.city}
      />
    </Box>
  ),
  employee: (
    <Box
      aria-label={formatMessage(columnsMessages.numberOfEmployee)}
      sx={{ flexShrink: 0, maxWidth: '250px' }}
    >
      <ComparatorInput
        value={searchTerm.employee}
        onValueChange={handleSelectChange('employee')}
      />
    </Box>
  ),
  socials: (
    <Box
      aria-label={formatMessage(commonMessages.socials)}
      sx={{ flexShrink: 0, maxWidth: '200px', minWidth: '200px' }}
    >
      <SocialsFilter
        values={searchTerm.socials}
        onChange={handleSelectChange('socials')}
      />
    </Box>
  ),
  contact: (
    <Box
      aria-label={formatMessage(commonMessages.contact)}
      sx={{ flexShrink: 0, maxWidth: '200px', minWidth: '200px' }}
    >
      <ContactFilter
        values={searchTerm.contact}
        onChange={handleSelectChange('contact')}
      />
    </Box>
  ),
  isCompanySeen: (
    <Box
      aria-label={formatMessage(commonMessages.isCompanySeen)}
      sx={{ flexShrink: 0 }}
    >
      <Typography
        component="label"
        endDecorator={
          <Switch
            checked={searchTerm.isCompanySeen}
            sx={{ ml: 1 }}
            onChange={() => {
              handleSelectChange('isCompanySeen')(!searchTerm.isCompanySeen)
            }}
          />
        }
      >
        {formatMessage(commonMessages.isCompanySeen)}
      </Typography>
    </Box>
  ),
  searchButton: (
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
  ),
})

export default getFilterComponents
