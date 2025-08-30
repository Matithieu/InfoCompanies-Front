import { Skeleton } from '@mui/joy'
import { FC } from 'react'

interface SkeletonRowsProps {
  numberOfColumns: number | undefined
}

const SkeletonRows: FC<SkeletonRowsProps> = ({ numberOfColumns }) => {
  return (
    <>
      {Array.from({ length: 10 }, (_, i) => (
        <tr key={i} style={{ maxHeight: '52px', width: '100%' }}>
          <td colSpan={numberOfColumns}>
            <Skeleton animation="wave" variant="text" />
          </td>
        </tr>
      ))}
    </>
  )
}

export default SkeletonRows
