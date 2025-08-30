import { contactFilterDescription } from '@/components/parts/Filters/filter.type'
import { Contact } from '@/types/index.types'
import { mapArrayToObject, mapObjectToArray } from '@/utils/object.util'
import CloseRounded from '@mui/icons-material/CloseRounded'
import {
  IconButton,
  Option,
  Select,
  SelectStaticProps,
  Tooltip,
} from '@mui/joy'
import { useRef, useState } from 'react'

interface ContactsFilterProps {
  values: Contact
  onChange: (values: Contact) => void
}

const ContactFilter: React.FC<ContactsFilterProps> = ({ onChange, values }) => {
  const [contactFilters, setContactFilters] = useState<Contact>(values)
  const action: SelectStaticProps['action'] = useRef(null)

  const contacts: (keyof NonNullable<Contact>)[] = [
    'email',
    'phoneNumber',
    'website',
  ]

  return (
    <Select
      multiple
      placeholder="Contact"
      sx={{ minWidth: 200 }}
      {...(values && {
        endDecorator: (
          <div>
            <Tooltip arrow title="Clear">
              <IconButton
                color="neutral"
                size="sm"
                variant="plain"
                onClick={() => {
                  onChange(null)
                  action.current?.focusVisible()
                }}
                onMouseDown={(event) => event.stopPropagation()}
              >
                <CloseRounded />
              </IconButton>
            </Tooltip>
          </div>
        ),
        indicator: null,
      })}
      value={mapObjectToArray(contactFilters)}
      onChange={(_event, newValues) => {
        setContactFilters(mapArrayToObject<Contact>(newValues))
        onChange(mapArrayToObject<Contact>(newValues))
      }}
    >
      {contacts.map((contact) => (
        <Option key={contact} value={contact}>
          {contactFilterDescription[contact]}
        </Option>
      ))}
    </Select>
  )
}

export default ContactFilter
