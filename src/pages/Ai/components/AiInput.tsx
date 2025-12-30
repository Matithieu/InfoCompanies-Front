import { Button, Input } from '@mui/joy'
import { FC, useState } from 'react'

type AiInputProps = {
  isLoading: boolean
  onSubmit: (value: string) => void
  cancel: () => void
}

const AiInput: FC<AiInputProps> = ({ cancel, isLoading, onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>('')

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim()

    if (trimmedValue && !isLoading) {
      onSubmit(trimmedValue)
      setInputValue('') // Clear input after submission
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit()
    }
  }

  const endDecorator = (
    <Button
      disabled={!inputValue.trim() && !isLoading}
      onClick={isLoading ? cancel : handleSubmit}
    >
      {isLoading ? 'Cancel' : 'Submit'}
    </Button>
  )

  return (
    <div>
      <Input
        endDecorator={endDecorator}
        inputMode="text"
        placeholder="Type something..."
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default AiInput
