import CloseRounded from '@mui/icons-material/CloseRounded'
import {
  IconButton,
  Option,
  Select,
  SelectStaticProps,
  Tooltip,
} from '@mui/joy'
import React from 'react'

import { SocialMedia } from '../../../../data/types/company'
import commonMessages from '../../../../services/intl/common.messages'
import { formatMessage } from '../../../../services/intl/intl'

interface SocialsFilterProps {
  values: Array<keyof SocialMedia>
  onChange: (values: Array<keyof SocialMedia>) => void
}

const socialPlatforms: Array<keyof SocialMedia> = [
  'facebook',
  'twitter',
  'linkedin',
  'instagram',
  'youtube',
]

const SocialsFilter: React.FC<SocialsFilterProps> = ({ onChange, values }) => {
  const action: SelectStaticProps['action'] = React.useRef(null)

  const handleChange = (
    _event: React.SyntheticEvent | null,
    newValues: Array<keyof SocialMedia> | null,
  ) => {
    if (newValues) {
      onChange(newValues)
    }
  }

  return (
    <Select
      multiple
      placeholder={formatMessage(commonMessages.socials)}
      sx={{ minWidth: 200 }}
      {...(values && {
        // display the button and remove select indicator
        // when user has selected a value
        endDecorator: (
          <div>
            <Tooltip arrow title={formatMessage(commonMessages.clear)}>
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
      {socialPlatforms.map((platform) => (
        <Option key={platform} value={platform}>
          {platform.charAt(0).toUpperCase() + platform.slice(1)}
        </Option>
      ))}
    </Select>
  )
}

export default SocialsFilter
