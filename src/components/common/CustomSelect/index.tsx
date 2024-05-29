import React, { useEffect, useMemo, useState } from 'react'
import { FixedSizeList } from 'react-window'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Checkbox,
  Chip,
  Dropdown,
  FormControl,
  FormLabel,
  Input,
  ListSubheader,
  MenuButton,
  Select,
  useTheme,
} from '@mui/joy'

const containsText = (text: string, searchText: string) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1

type RenderRowProps = {
  index: number
  style: React.CSSProperties
  data: {
    displayedOptions: string[]
    selectedOptions: string[]
    handleToggle: (value: string) => void
  }
}

const RenderRow = ({ index, style, data }: RenderRowProps) => {
  const { displayedOptions, selectedOptions, handleToggle } = data
  const option = displayedOptions[index]

  const theme = useTheme()

  return (
    <FormControl>
      <Dropdown>
        <MenuButton
          key={index}
          style={style}
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            width: '100%',
            padding: '0.5rem',
            backgroundColor:
              selectedOptions.indexOf(option) !== -1
                ? theme.palette.primary.mainChannel // Utilisez la couleur principale du thème
                : theme.palette.background.surface, // Utilisez la couleur de fond du thème
            '&:hover': {
              backgroundColor: theme.palette.primary.mainChannel,
            },
            overflowY: 'hidden',
            borderRadius: 0,
          }}
          value={option}
          onClick={() => handleToggle(option)}
        >
          <Checkbox
            checked={selectedOptions.indexOf(option) !== -1}
            sx={{ marginRight: '0.5rem' }}
            value={option}
          />
          {option}
        </MenuButton>
      </Dropdown>
    </FormControl>
  )
}

type CustomSelectProps = {
  options: string[]
  onSelectionChange: (selectedValues: string[]) => void
  selectedValues?: string[]
  label: string
  placeholder: string
  value?: string[]
}

const CustomSelect = ({
  options,
  onSelectionChange,
  selectedValues,
  label,
  placeholder,
  value,
}: CustomSelectProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    selectedValues ?? [''],
  )
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    setSelectedOptions(value ?? [])
  }, [value])

  const displayedOptions = useMemo(
    () => options.filter((option) => containsText(option, searchText)),
    [searchText, options],
  )

  const handleToggle = (value: string) => {
    const currentIndex = selectedOptions.indexOf(value)
    const newChecked = [...selectedOptions]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setSelectedOptions(newChecked)
    onSelectionChange(newChecked)
  }

  return (
    <FormControl>
      <FormLabel id="universal-select-label">{label}</FormLabel>
      <Select
        multiple
        defaultValue={['Lol']}
        id="universal-select"
        renderValue={(selectedOptions) => (
          <Box sx={{ display: 'flex', gap: '0.25rem' }}>
            {selectedOptions.map((selectedOption) => (
              <Chip key={selectedOption.id} color="primary" variant="soft">
                {selectedOption.label}
              </Chip>
            ))}
          </Box>
        )}
        slotProps={{
          listbox: {
            sx: {
              width: '100%',
            },
          },
        }}
        sx={{
          minWidth: '15rem',
        }}
        value={selectedOptions}
      >
        <FormControl>
          <ListSubheader>
            <Input
              autoFocus
              placeholder={placeholder}
              size="sm"
              startDecorator={<SearchIcon />}
              style={{ marginBottom: 5 }}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Escape') {
                  e.preventDefault()

                  if (displayedOptions.length > 0) {
                    handleToggle(displayedOptions[0])
                  }

                  return
                }
              }}
            />
          </ListSubheader>
          <FixedSizeList
            height={250}
            itemCount={displayedOptions.length}
            itemData={{
              displayedOptions,
              selectedOptions,
              handleToggle,
            }}
            itemSize={50}
            width="100%"
          >
            {RenderRow}
          </FixedSizeList>
        </FormControl>
      </Select>
    </FormControl>
  )
}

export default CustomSelect
