import { FC } from 'react'

type CellContentProps = {
  content: string | number | undefined
  handleFunction?: (content: string | number | undefined) => void
}

const CellContent: FC<CellContentProps> = ({ content, handleFunction }) => {
  return (
    <span
      style={{
        color: content ? 'inherit' : '#808080',
        display: 'block',
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
      onClick={(e) => {
        if (content && handleFunction) {
          e.stopPropagation()
          handleFunction(content)
        }
      }}
    >
      {content ?? '-'}
    </span>
  )
}

export default CellContent
