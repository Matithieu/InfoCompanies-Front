import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { FC } from 'react'

import { SocialMedia } from '../../../../data/types/company'
import LinkIcon from '../../../common/Icons/LinkIcon'

type TableCompanySocialProps = {
  socialMedia: SocialMedia | undefined
}

const TableCompanySocial: FC<TableCompanySocialProps> = ({ socialMedia }) => {
  if (socialMedia === undefined) {
    return null
  }

  return (
    <div id="joyride-step-3" style={{ display: 'flex', alignItems: 'center' }}>
      {socialMedia.facebook && (
        <LinkIcon
          icon={<FacebookIcon fontSize="medium" />}
          style={{ color: '#3b5998' }}
          url={socialMedia.facebook}
        />
      )}
      {socialMedia.linkedin && (
        <LinkIcon
          icon={<LinkedInIcon fontSize="medium" />}
          style={{ color: '#0e76a8' }}
          url={socialMedia.linkedin}
        />
      )}
      {socialMedia.instagram && (
        <LinkIcon
          icon={<InstagramIcon fontSize="medium" />}
          style={{ color: '#E4405F' }}
          url={socialMedia.instagram}
        />
      )}
      {socialMedia.twitter && (
        <LinkIcon
          icon={<TwitterIcon fontSize="medium" />}
          style={{ color: '#1DA1F2' }}
          url={socialMedia.twitter}
        />
      )}
      {socialMedia.youtube && (
        <LinkIcon
          icon={<YouTubeIcon fontSize="medium" />}
          style={{ color: 'red' }}
          url={socialMedia.youtube}
        />
      )}
    </div>
  )
}

export default TableCompanySocial
