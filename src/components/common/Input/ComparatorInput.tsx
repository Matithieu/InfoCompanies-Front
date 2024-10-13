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

import { ComparatorType, EmployeeFilter } from '../../../data/types/index.types'
import ComparaisonValues from './components/ComparaisonValues'

interface ComparatorInputProps {
  value: EmployeeFilter
  onValueChange: (value: EmployeeFilter) => void
}

const ComparatorInput: FC<ComparatorInputProps> = ({
  value,
  onValueChange,
}) => {
  const [comparator, setComparator] = useState<ComparatorType | undefined>(
    value.comparator ?? undefined,
  )
  const [amount, setAmount] = useState<number | undefined>(
    value.amount ?? undefined,
  )

  const handleComparatorSelect = (
    _event: SyntheticEvent | null,
    value: ComparatorType,
  ) => {
    setComparator(value)
    onValueChange({ comparator: value, amount })
  }

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue =
      event.target.value === '' ? undefined : parseInt(event.target.value)

    // Ensure the value doesn't exceed 100,000,000
    if (
      newValue &&
      newValue > 100_000_000 &&
      amount &&
      newValue !== amount + 1
    ) {
      newValue = 100_000_000
    }

    setAmount(newValue)
    onValueChange({ comparator, amount: newValue })
  }

  const handleDelete = () => {
    setComparator(undefined)
    setAmount(undefined)
    onValueChange({ comparator: undefined, amount: undefined })
  }

  return (
    <Dropdown>
      <MenuButton
        endDecorator={
          <Tooltip arrow title="Clear">
            <div
              aria-label="Delete filter"
              style={{ zIndex: 3000, cursor: 'pointer' }}
              onClick={handleDelete}
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
            amount === undefined || comparator === undefined
              ? 'body-sm'
              : 'inherit'
          }
          sx={{
            color:
              amount === undefined || comparator === undefined
                ? 'gray'
                : 'inherit',
          }}
        >
          {amount !== undefined && comparator !== undefined
            ? `${comparator} ${amount}`
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
            value={amount ?? ''}
            onChange={handleNumberChange}
          />
          <ToggleButtonGroup
            value={comparator}
            onChange={(event, newValue) =>
              handleComparatorSelect(event, newValue as ComparatorType)
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
