import { IconButton } from '@mui/joy'
import { FC, Fragment } from 'react'

const ComparaisonValues: FC = () => {
  return (
    <Fragment>
      <IconButton value="<">{'<'}</IconButton>
      <IconButton value="=">=</IconButton>
      <IconButton value=">">{'>'}</IconButton>
    </Fragment>
  )
}

export default ComparaisonValues
