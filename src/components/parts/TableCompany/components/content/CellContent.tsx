import { FC } from 'react'

type CellContentProps = {
  content: string
  handleFunction?: (content: string) => void
}

const CellContent: FC<CellContentProps> = ({ content, handleFunction }) => {
  return (
    <span
      style={{
        color: content ? 'inherit' : '#808080',
      }}
      onClick={(e) => {
        e.stopPropagation()

        if (handleFunction) {
          if (!content) return null
          handleFunction(content)
        }
      }}
    >
      {content ?? '-'}
    </span>
  )
}

export default CellContent
