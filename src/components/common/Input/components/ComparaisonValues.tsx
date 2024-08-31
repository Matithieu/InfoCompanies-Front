import { IconButton } from '@mui/joy'
import { FC, Fragment } from 'react'

const ComparaisonValues: FC = () => {
  return (
    <Fragment>
      <IconButton title="Inférieur à" value="<">
        {'<'}
      </IconButton>
      <IconButton title="Égal à" value="=">
        =
      </IconButton>
      <IconButton title="Supérieur à" value=">">
        {'>'}
      </IconButton>
    </Fragment>
  )
}

export default ComparaisonValues
