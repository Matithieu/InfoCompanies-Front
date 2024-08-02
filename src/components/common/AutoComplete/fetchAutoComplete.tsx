import { CircularProgress, FormControl, FormLabel } from '@mui/joy'
import Autocomplete, { AutocompleteProps } from '@mui/joy/Autocomplete'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

type FetchAutoCompleteProps<T> = {
  handleSelectChange: (items: T[]) => void
  fetchFunction: (input: string) => Promise<T[]>
  queryKeyBase: string
  getOptionLabel: (option: T) => string
  inputLabel: string
} & Omit<
  AutocompleteProps<T, true, false, false>,
  'renderInput' | 'options' | 'loading' | 'onChange' | 'onInputChange'
>

const FetchAutoComplete = <T,>({
  handleSelectChange,
  fetchFunction,
  queryKeyBase,
  getOptionLabel,
  inputLabel,
  ...autocompleteProps
}: FetchAutoCompleteProps<T>) => {
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
    if (debouncedInputValue.length > 2) {
      refetch()
    }
  }, [debouncedInputValue, refetch])

  return (
    <FormControl sx={{ marginBottom: 2 }}>
      <FormLabel>{inputLabel}</FormLabel>
      <Autocomplete
        multiple
        getOptionLabel={getOptionLabel}
        inputValue={inputValue}
        limitTags={1}
        loading={isLoading}
        noOptionsText={
          data !== undefined && data.length === 0
            ? 'Aucun résultat'
            : 'Entrez au moins 3 caractères'
        }
        options={data || []}
        placeholder={inputLabel}
        onChange={(_, value) => {
          if (value) {
            handleSelectChange(value as T[])
          }
        }}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue)
        }}
        {...autocompleteProps}
        slotProps={{
          input: {
            label: inputLabel,
            endDecorator: (
              <>{isLoading ? <CircularProgress size="sm" /> : null}</>
            ),
          },
        }}
      />
    </FormControl>
  )
}

export default FetchAutoComplete
