import { SocialMedia } from '@/types/index.types'
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

import commonMessages from '../../../../services/intl/common.messages'
import { formatMessage } from '../../../../services/intl/intl'

interface SocialsFilterProps {
  values: SocialMedia
  onChange: (values: SocialMedia) => void
}

const SocialsFilter: React.FC<SocialsFilterProps> = ({ onChange, values }) => {
  const [socialFilters, setSocialFilters] = useState<SocialMedia>(values)
  const action: SelectStaticProps['action'] = useRef(null)

  const socialMediaPlatforms: (keyof NonNullable<SocialMedia>)[] = [
    'twitter',
    'linkedin',
    'facebook',
    'instagram',
  ]

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
      value={mapObjectToArray(socialFilters)}
      onChange={(_event, newValues) => {
        setSocialFilters(mapArrayToObject<SocialMedia>(newValues))
        onChange(mapArrayToObject<SocialMedia>(newValues))
      }}
    >
      {socialMediaPlatforms.map((platform) => (
        <Option key={platform} value={platform}>
          {platform.charAt(0).toUpperCase() + platform.slice(1)}
        </Option>
      ))}
    </Select>
  )
}

export default SocialsFilter
