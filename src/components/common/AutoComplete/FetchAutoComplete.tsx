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
import { FC, useEffect, useMemo, useState } from 'react'

import { AutoCompleteType } from '../../../data/types/index.types'
import commonMessages from '../../../services/intl/common.messages'
import { formatMessage } from '../../../services/intl/intl'

type FetchAutoCompleteProps<T> = {
  handleSelectChange: (items: T[]) => void
  fetchFunction: (input: string) => Promise<T[]>
  queryKeyBase: string
  inputLabel: string
  isLabelHidden?: boolean
  value?: T[]
}

const FetchAutoComplete: FC<FetchAutoCompleteProps<AutoCompleteType>> = ({
  handleSelectChange,
  fetchFunction,
  queryKeyBase,
  inputLabel,
  isLabelHidden,
  value = [],
}) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>('')

  const {
    data: fetchedOptions = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [queryKeyBase, debouncedInputValue],
    queryFn: () => fetchFunction(debouncedInputValue),
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

  // Merging selected values with fetched options
  const mergedOptions = useMemo(() => {
    const valueIds = value.map((item) => item.id)
    const merged = [
      ...value,
      ...fetchedOptions.filter((option) => !valueIds.includes(option.id)),
    ]
    return merged
  }, [value, fetchedOptions])

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
        noOptionsText={
          fetchedOptions.length === 0
            ? formatMessage(commonMessages.noResults)
            : formatMessage(commonMessages.enterAtLeastCharacters, { count: 2 })
        }
        options={mergedOptions}
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
        value={value}
        onChange={(_, newValue) => {
          if (newValue) {
            handleSelectChange(newValue as AutoCompleteType[])
          }
        }}
        // eslint-disable-next-line react/jsx-sort-props
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue)
        }}
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
