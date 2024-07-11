import { Box } from '@mui/material'
import { useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'

import { Products } from '../../data/Stripe/subscription'
import SubscriptionCard from './components/SubscriptionCard'

const Subscription: React.FC = () => {
  const subscriptions = Products.sort((a, b) => a.price - b.price)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  // State to manage if a button is clicked
  const [buttonClicked, setButtonClicked] = useState(false)

  const handleCardClick = () => {
    setButtonClicked(true)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isSmallScreen ? 'column' : 'row',
        justifyContent: 'center',
        padding: '20px',
        gap: '30px',
      }}
    >
      {subscriptions.map((option, index) => (
        <SubscriptionCard
          key={index}
          disabled={buttonClicked}
          item={option}
          onCardClick={handleCardClick}
        />
      ))}
    </Box>
  )
}

export default Subscription
