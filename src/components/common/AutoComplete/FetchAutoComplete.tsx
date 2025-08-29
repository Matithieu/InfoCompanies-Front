import Close from '@mui/icons-material/Close'
import {
  AutocompleteOption,
  Chip,
  CircularProgress,
  FormControl,
  ListItemContent,
} from '@mui/joy'
import Autocomplete from '@mui/joy/Autocomplete'
import { useQuery } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'

import commonMessages from '../../../services/intl/common.messages'
import { formatMessage } from '../../../services/intl/intl'
import {
  AutocompleteByNameQueries,
  AutocompleteByNamesQueries,
  AutoCompleteItem,
} from '../../../types/index.types'

type FetchAutoCompleteProps = {
  handleSelectChange: (items: Array<string>) => void
  fetchAutocompleteByName: (
    input: AutocompleteByNameQueries,
  ) => Promise<AutoCompleteItem[]>
  fetchAutocompleteByNames: (
    input: AutocompleteByNamesQueries,
  ) => Promise<AutoCompleteItem[]>
  queryKeyBase: string
  inputLabel: string
  isLabelHidden?: boolean
  autocompleteItems: Array<string> | undefined
}

const FetchAutoComplete: FC<FetchAutoCompleteProps> = ({
  handleSelectChange,
  fetchAutocompleteByName,
  fetchAutocompleteByNames,
  queryKeyBase,
  inputLabel,
  isLabelHidden,
  autocompleteItems,
}) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>('')
  const [selectedItems, setSelectedItems] = useState<AutoCompleteItem[]>([])

  const valuesToFetch = autocompleteItems
    ? autocompleteItems.filter(
        (name) => !selectedItems.map((item) => item.name).includes(name),
      )
    : []

  // As we receive only names in the filter, we need to fetch the full objects to display them as selected
  // Also, we don't want to refetch what's already selected
  const { data: initialValues } = useQuery({
    queryKey: [`autocomplete ${inputLabel}`, valuesToFetch],
    queryFn: () =>
      valuesToFetch
        ? fetchAutocompleteByNames({ query: valuesToFetch })
        : Promise.resolve([]),
    enabled: valuesToFetch ? valuesToFetch?.length > 0 : false,
  })

  useEffect(() => {
    if (initialValues) setSelectedItems(initialValues)
  }, [initialValues])

  const { data, refetch, isLoading } = useQuery({
    queryKey: [queryKeyBase, debouncedInputValue],
    queryFn: () => fetchAutocompleteByName({ query: debouncedInputValue }),
    enabled: false,
  })

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInputValue(inputValue)
    }, 450)

    return () => {
      clearTimeout(handler)
    }
  }, [inputValue])

  useEffect(() => {
    refetch()
  }, [debouncedInputValue, refetch])

  return (
    <FormControl>
      <Autocomplete
        multiple
        getOptionKey={(option) => option.id}
        getOptionLabel={(option) => option.name}
        inputValue={inputValue}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        limitTags={1}
        loading={isLoading}
        noOptionsText={(() => {
          if (data === undefined) return 'Loading...'
          if (data.length === 0) return formatMessage(commonMessages.noResults)
          return formatMessage(commonMessages.enterAtLeastCharacters, {
            count: 2,
          })
        })()}
        options={data || []}
        renderOption={(props, option) => (
          <AutocompleteOption {...props} key={option.id}>
            <ListItemContent>{option.name}</ListItemContent>
          </AutocompleteOption>
        )}
        slotProps={{
          input: {
            label: inputLabel,
            enddecorator: (
              <>{isLoading ? <CircularProgress size="sm" /> : null}</>
            ),
          },
        }}
        value={selectedItems}
        onChange={(_, newValue) => {
          setSelectedItems(newValue)
          handleSelectChange(newValue.map((item) => item.name))
        }}
        // eslint-disable-next-line react/jsx-sort-props
        onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
        placeholder={isLabelHidden ? undefined : inputLabel}
        // So each tag has a different key
        renderTags={(tags, getTagProps) =>
          tags.map((item, index) => {
            const { key, ...otherTagProps } = getTagProps({ index })
            return (
              <Chip
                key={key}
                endDecorator={<Close fontSize="small" />}
                sx={{ minWidth: 0, maxWidth: '63%' }} // Max size to avoid break line
                {...otherTagProps}
              >
                {item.name}
              </Chip>
            )
          })
        }
      />
    </FormControl>
  )
}

export default FetchAutoComplete
