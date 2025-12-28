import JumpingDots from '@/components/common/JumpingDots/JumpingDots'
import { useStreamAI } from '@/hooks/useStreamAI'
import { Button, Input } from '@mui/joy'
import { Typography } from '@mui/material'
import { FC, useState } from 'react'

const Test: FC = () => {
  const [userInput, setUserInput] = useState<string>('Hello, how are you?')

  const { response, loading, streamAI, cancel, reset } = useStreamAI({
    url: '/v1/stream-ai',
  })

  const handleSubmit = () => {
    streamAI(userInput)
  }

  return (
    <>
      <Input
        inputMode="text"
        placeholder="Type something..."
        value={userInput}
        onChange={(event) => setUserInput(event.target.value)}
      />

      <div>
        <Button
          disabled={loading}
          sx={{ marginTop: '1rem' }}
          onClick={handleSubmit}
        >
          Submit
        </Button>

        <Button disabled={!loading} sx={{ marginTop: '1rem' }} onClick={cancel}>
          Cancel
        </Button>

        <Button disabled={loading} sx={{ marginTop: '1rem' }} onClick={reset}>
          Reset
        </Button>
      </div>

      <Typography gutterBottom component="h1" variant="h4">
        {response ? response : <JumpingDots />}
      </Typography>
    </>
  )
}

export default Test
