import ComparatorInput from '@/components/common/Input/ComparatorInput'
import ContactFilter from '@/components/common/Select/Contact/ContactFilter'
import SocialsFilter from '@/components/common/Select/SocialMedia/SocialsFilter'
import Switch from '@/components/common/Switch/Switch'
import commonMessages from '@/services/intl/common.messages'
import { formatMessage } from '@/services/intl/intl'
import { FilterParams } from '@/stores/FiltersStore'
import { SearchParamsNonNullable } from '@/types/index.types'
import { Box, Typography } from '@mui/joy'

import buildAutocompleteComponent from './BuildAutocompleteComponent'

type Props = {
  filterValues: FilterParams
  displayedValues: FilterParams
  setCurrentFilterValues: (params: FilterParams) => void
}

const renderFilterComponents = ({
  filterValues,
  displayedValues,
  setCurrentFilterValues,
}: Props) => {
  const handleAutoCompleteChange =
    (key: keyof FilterParams) =>
    (values: (typeof filterValues)[typeof key]) => {
      if (key === 'socials' && typeof values === 'string') {
        // Fix the displaying of the socials in the filter + removal (state directly inside the component like fetchautocomplete)
        setCurrentFilterValues({
          ...filterValues,
          socials: {
            ...filterValues.socials,
            [values]: values,
          } as FilterParams['socials'],
        })
      } else if (key === 'contacts' && typeof values === 'string') {
        // Fix the displaying of the contacts in the filter + removal (state directly inside the component like fetchautocomplete)
        setCurrentFilterValues({
          ...filterValues,
          contacts: {
            ...filterValues.contacts,
            [values]: values,
          } as FilterParams['contacts'],
        })
      } else {
        setCurrentFilterValues({ ...filterValues, [key]: values })
      }
    }

  return {
    cityNames: buildAutocompleteComponent(
      'cityNames',
      displayedValues.cityNames,
      handleAutoCompleteChange('cityNames'),
    ),
    regionNames: buildAutocompleteComponent(
      'regionNames',
      displayedValues.regionNames,
      handleAutoCompleteChange('regionNames'),
    ),
    industrySectorNames: buildAutocompleteComponent(
      'industrySectorNames',
      displayedValues.industrySectorNames,
      handleAutoCompleteChange('industrySectorNames'),
    ),
    legalFormNames: buildAutocompleteComponent(
      'legalFormNames',
      displayedValues.legalFormNames,
      handleAutoCompleteChange('legalFormNames'),
    ),
    numberOfEmployeeFilter: (
      <Box>
        <ComparatorInput
          value={filterValues?.numberOfEmployeeFilter}
          onValueChange={(values) =>
            handleAutoCompleteChange('numberOfEmployeeFilter')(values)
          }
        />
      </Box>
    ),
    socials: (
      <Box
        aria-label={formatMessage(commonMessages.socials)}
        sx={{ flexShrink: 0, maxWidth: '200px', minWidth: '200px' }}
      >
        <SocialsFilter
          values={filterValues?.socials}
          onChange={(values) => handleAutoCompleteChange('socials')(values)}
        />
      </Box>
    ),
    contacts: (
      <Box
        aria-label={formatMessage(commonMessages.contact)}
        sx={{ flexShrink: 0, maxWidth: '200px', minWidth: '200px' }}
      >
        <ContactFilter
          values={filterValues?.contacts}
          onChange={(values) => handleAutoCompleteChange('contacts')(values)}
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
              checked={filterValues?.isCompanySeen}
              handleOnChange={(value) =>
                handleAutoCompleteChange('isCompanySeen')(value.target.checked)
              }
            />
          }
        >
          {formatMessage(commonMessages.isCompanySeen)}
        </Typography>
      </Box>
    ),
  } satisfies Record<keyof SearchParamsNonNullable, React.JSX.Element>
}

export default renderFilterComponents
