import { Button, Input } from '@mui/joy'
import { FC } from 'react'

type AiFooterProps = {
  value: string | undefined
  isLoading: boolean
  setUserInput: (value: string) => void
  handleSubmit: () => void
  cancel: () => void
}

const AiFooter: FC<AiFooterProps> = ({
  cancel,
  handleSubmit,
  isLoading,
  setUserInput,
  value,
}) => {
  const endDecorator = (
    <Button onClick={isLoading ? cancel : handleSubmit}>
      {isLoading ? 'Cancel' : 'Submit'}
    </Button>
  )

  return (
    <div>
      <Input
        endDecorator={endDecorator}
        inputMode="text"
        placeholder="Type something..."
        sx={{
          display: 'flex',
        }}
        value={value}
        onChange={(event) => setUserInput(event.target.value)}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '15px',
        }}
      ></div>
    </div>
  )
}

export default AiFooter
