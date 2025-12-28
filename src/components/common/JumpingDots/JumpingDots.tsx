import { FC } from 'react'

const JumpingDots: FC = () => {
  return (
    <div className="flex items-center">
      <div className="animate-bounce [animation-delay:-0.3s]">.</div>
      <div className="animate-bounce [animation-delay:-0.15s]">.</div>
      <div className="animate-bounce">.</div>
    </div>
  )
}

export default JumpingDots
