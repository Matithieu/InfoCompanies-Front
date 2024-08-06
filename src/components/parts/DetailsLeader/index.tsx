import { FC } from 'react'

import { Leader } from '../../../data/types/leader'
import { PleaseSelectACompanyText } from '../../common/Texts'
import DetailsLeaderRow from './components/DetailsLeaderRow'

type DetailsLeaderProps = {
  leader: Leader
}

const DetailsLeader: FC<DetailsLeaderProps> = ({ leader }) => {
  if (leader === null) {
    return <PleaseSelectACompanyText />
  } else {
    return <DetailsLeaderRow leader={leader} />
  }
}

export default DetailsLeader
