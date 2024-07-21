import React from 'react'

interface ReusableContainerProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const ReusableContainer: React.FC<ReusableContainerProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

export default ReusableContainer
