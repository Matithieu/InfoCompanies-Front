import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Button } from '@mui/joy'
import { FC } from 'react'

import useAuthManager from '../../../hooks/useAuthManager'

const TryWithoutCBButton: FC = () => {
  const { signIn } = useAuthManager()
  return (
    <Button endDecorator={<ArrowForwardIcon />} onClick={() => signIn()}>
      Essayer (sans CB)
    </Button>
  )
}

export default TryWithoutCBButton
