import CloseRounded from '@mui/icons-material/CloseRounded'
import {
  IconButton,
  Option,
  Select,
  SelectStaticProps,
  Tooltip,
} from '@mui/joy'
import React from 'react'

import { contactFilterDescription } from '../filter.type'

export type Contact = {
  email: string
  phone: string
  website: string
}

const ContactOptions: Array<keyof Contact> = ['email', 'phone', 'website']

interface ContactsFilterProps {
  values: Array<keyof Contact>
  onChange: (values: Array<keyof Contact>) => void
}

const ContactFilter: React.FC<ContactsFilterProps> = ({ onChange, values }) => {
  const action: SelectStaticProps['action'] = React.useRef(null)

  const handleChange = (
    _event: React.SyntheticEvent | null,
    newValues: Array<keyof Contact> | null,
  ) => {
    if (newValues) {
      onChange(newValues)
    }
  }

  return (
    <Select
      multiple
      placeholder="Contact"
      sx={{ minWidth: 200 }}
      {...(values && {
        // display the button and remove select indicator
        // when user has selected a value
        endDecorator: (
          <div>
            <Tooltip arrow title="Clear">
              <IconButton
                color="neutral"
                size="sm"
                variant="plain"
                onClick={() => {
                  onChange([])
                  action.current?.focusVisible()
                }}
                onMouseDown={(event) => {
                  // don't open the popup when clicking on this button
                  event.stopPropagation()
                }}
              >
                <CloseRounded />
              </IconButton>
            </Tooltip>
          </div>
        ),
        indicator: null,
      })}
      value={values}
      onChange={handleChange}
    >
      {ContactOptions.map((contact) => (
        <Option key={contact} value={contact}>
          {contactFilterDescription[contact]}
        </Option>
      ))}
    </Select>
  )
}

export default ContactFilter
