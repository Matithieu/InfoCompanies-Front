import FetchAutoComplete from '@/components/common/AutoComplete/FetchAutoComplete'
import {
  fetchAutoCompleteByName,
  fetchAutoCompleteByNames,
} from '@/utils/api/queries'
import { Box } from '@mui/joy'

import {
  AutocompleteFilterFields,
  autocompletePluralParamMapping,
  autocompleteSingularParamMapping,
  filterNamesMapping,
} from '../filter.type'

const buildAutocompleteComponent = <K extends keyof AutocompleteFilterFields>(
  autocompleteKey: K,
  filterValueNames: string[],
  handleSelectChange: (names: string[]) => void,
) => {
  return (
    <Box
      key={autocompleteKey}
      aria-label={filterNamesMapping[autocompleteKey]}
      sx={{ flexShrink: 0, maxWidth: '250px' }}
    >
      <FetchAutoComplete
        autocompleteItems={filterValueNames}
        fetchAutocompleteByName={(query) =>
          fetchAutoCompleteByName(
            autocompleteSingularParamMapping[autocompleteKey],
            {
              ...query,
            },
          )
        }
        fetchAutocompleteByNames={(query) =>
          fetchAutoCompleteByNames(
            autocompletePluralParamMapping[autocompleteKey],
            { ...query },
          )
        }
        handleSelectChange={handleSelectChange}
        inputLabel={filterNamesMapping[autocompleteKey]}
        isLabelHidden={filterValueNames === undefined}
        queryKeyBase={autocompleteKey}
      />
    </Box>
  )
}

export default buildAutocompleteComponent
