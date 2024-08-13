import { CircularProgress, FormControl } from '@mui/joy'
import Autocomplete, { AutocompleteProps } from '@mui/joy/Autocomplete'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { AutoCompleteType } from '../../../data/types/common'

type FetchAutoCompleteProps<T> = {
  handleSelectChange: (items: T[]) => void
  fetchFunction: (input: string) => Promise<T[]>
  queryKeyBase: string
  getOptionLabel: (option: T) => string
  inputLabel: string
  isLabelHidden?: boolean
} & Omit<
  AutocompleteProps<T, true, false, false>,
  'renderInput' | 'options' | 'loading' | 'onChange' | 'onInputChange'
>

const FetchAutoComplete = ({
  handleSelectChange,
  fetchFunction,
  queryKeyBase,
  getOptionLabel,
  inputLabel,
  isLabelHidden,
}: FetchAutoCompleteProps<AutoCompleteType>) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>('')

  const { data, refetch, isLoading } = useQuery({
    queryKey: [queryKeyBase, debouncedInputValue],
    queryFn: () => fetchFunction(debouncedInputValue),
    enabled: false,
  })

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInputValue(inputValue)
    }, 350)

    return () => {
      clearTimeout(handler)
    }
  }, [inputValue])

  useEffect(() => {
    if (debouncedInputValue.length > 1) {
      refetch()
    }
  }, [debouncedInputValue, refetch])

  return (
    <FormControl>
      <Autocomplete
        multiple
        getOptionLabel={getOptionLabel}
        inputValue={inputValue}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        limitTags={1}
        loading={isLoading}
        noOptionsText={
          data !== undefined && data.length === 0
            ? 'Aucun résultat'
            : 'Entrez au moins 2 caractères'
        }
        options={data || []}
        placeholder={isLabelHidden ? undefined : inputLabel}
        slotProps={{
          input: {
            label: inputLabel,
            enddecorator: (
              <>{isLoading ? <CircularProgress size="sm" /> : null}</>
            ),
          },
        }}
        onChange={(_, value) => {
          if (value) {
            handleSelectChange(value as AutoCompleteType[])
          }
        }}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue)
        }}
      />
    </FormControl>
  )
}

export default FetchAutoComplete
