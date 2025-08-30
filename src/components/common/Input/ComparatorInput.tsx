import { EmployeeFilter, SignComparator } from '@/types/index.types'
import { isNotNU } from '@/utils/assertion.util'
import ClearIcon from '@mui/icons-material/Clear'
import {
  Dropdown,
  Input,
  Menu,
  MenuButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/joy'
import { ChangeEvent, FC, SyntheticEvent, useState } from 'react'

import ComparaisonValues from './components/ComparaisonValues'

interface ComparatorInputProps {
  value: EmployeeFilter
  onValueChange: (value: EmployeeFilter) => void
}

const ComparatorInput: FC<ComparatorInputProps> = ({
  value,
  onValueChange,
}) => {
  const [employeeFilter, setEmployeeFilter] = useState<{
    numberOfEmployee?: number
    signComparator?: SignComparator
  }>(value || {})

  const handleComparatorSelect = (
    _event: SyntheticEvent | null,
    signComparator: SignComparator,
  ) => {
    const updatedFilter = { ...employeeFilter, signComparator }
    setEmployeeFilter(updatedFilter)

    // Only call onValueChange if both values are defined
    if (
      isNotNU(updatedFilter.numberOfEmployee) &&
      isNotNU(updatedFilter.signComparator)
    ) {
      onValueChange({
        numberOfEmployee: updatedFilter.numberOfEmployee,
        signComparator: updatedFilter.signComparator,
      })
    }
  }

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value

    if (inputValue === '') {
      const updatedFilter = { ...employeeFilter, numberOfEmployee: undefined }
      setEmployeeFilter(updatedFilter)
      return
    }

    const numericValue = parseInt(inputValue, 10)

    if (Number.isNaN(numericValue)) {
      return
    }

    if (numericValue === employeeFilter.numberOfEmployee) return

    let value = numericValue
    if (value > 100_000_000) value = 100_000_000
    if (value < 0) value = 0

    const updatedFilter = { ...employeeFilter, numberOfEmployee: value }
    setEmployeeFilter(updatedFilter)

    // Only call onValueChange if both values are defined
    if (updatedFilter.signComparator !== undefined) {
      onValueChange({
        numberOfEmployee: value,
        signComparator: updatedFilter.signComparator,
      })
    }
  }

  // TODO: translate
  return (
    <Dropdown>
      <MenuButton
        endDecorator={
          <Tooltip arrow title="Clear">
            <div
              aria-label="Delete filter"
              style={{ zIndex: 3000, cursor: 'pointer' }}
              onClick={() => {
                setEmployeeFilter({})
                onValueChange(null)
              }}
            >
              <ClearIcon />
            </div>
          </Tooltip>
        }
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          minWidth: '170px',
          justifyContent: 'space-between',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography
          level={
            employeeFilter.numberOfEmployee === undefined ||
            employeeFilter.signComparator === undefined
              ? 'body-sm'
              : 'inherit'
          }
          sx={{
            color:
              employeeFilter.numberOfEmployee === undefined ||
              employeeFilter.signComparator === undefined
                ? 'gray'
                : 'inherit',
          }}
        >
          {employeeFilter.numberOfEmployee !== undefined &&
          employeeFilter.signComparator !== undefined
            ? `${employeeFilter.signComparator} ${employeeFilter.numberOfEmployee}`
            : 'Salariés'}
        </Typography>
      </MenuButton>
      <Menu
        invertedColors
        aria-labelledby="apps-menu-demo"
        sx={{ display: 'flex', flexDirection: 'row' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '10px',
            padding: '10px',
          }}
        >
          <Input
            placeholder="Enter number"
            sx={{ width: '150px' }}
            type="number"
            value={employeeFilter.numberOfEmployee ?? ''}
            onChange={handleNumberChange}
          />
          <ToggleButtonGroup
            value={employeeFilter.signComparator}
            onChange={(event, newValue) =>
              handleComparatorSelect(event, newValue as SignComparator)
            }
          >
            <ComparaisonValues />
          </ToggleButtonGroup>
        </div>
      </Menu>
    </Dropdown>
  )
}

export default ComparatorInput
