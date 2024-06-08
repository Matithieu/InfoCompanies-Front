import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { SocialMedia } from '../../../../data/types/company'
import LinkIcon from '../../../common/Icons/LinkIcon'

type TableCompanySocialProps = {
  socialMedia: SocialMedia
}

export default function TableCompanySocial({
  socialMedia,
}: TableCompanySocialProps) {
  return (
    <>
      {socialMedia.facebook && (
        <LinkIcon
          url={socialMedia.facebook}
          icon={<FacebookIcon />}
          style={{ color: '#3b5998' }}
        />
      )}
      {socialMedia.twitter && (
        <LinkIcon
          url={socialMedia.twitter}
          icon={<TwitterIcon />}
          style={{ color: '#1DA1F2' }}
        />
      )}
      {socialMedia.linkedin && (
        <LinkIcon
          url={socialMedia.linkedin}
          icon={<LinkedInIcon />}
          style={{ color: '#0e76a8' }}
        />
      )}
      {socialMedia.youtube && (
        <LinkIcon
          url={socialMedia.youtube}
          icon={<YouTubeIcon />}
          style={{ color: 'red' }}
        />
      )}
    </>
  )
}
