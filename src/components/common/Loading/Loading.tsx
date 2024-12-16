import CircularProgress from '@mui/material/CircularProgress'
import React, { FC } from 'react'

type LoadingProps = {
  children: React.ReactNode
  isLoading: boolean
  isCentered?: boolean
}

const Loading: FC<LoadingProps> = ({
  children,
  isLoading,
  isCentered = false,
}) => {
  return isLoading ? (
    <div
      style={isCentered ? { display: 'flex', justifyContent: 'center' } : {}}
    >
      <CircularProgress color="primary" style={{ margin: 'auto' }} />
    </div>
  ) : (
    <>{children}</>
  )
}

export default Loading
