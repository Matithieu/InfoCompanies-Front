import React from 'react'
import { Products } from '../../data/Stripe/subscription'
import SubscriptionCard from './components/SubscriptionCard'
import { Box } from '@mui/material'
import { useTheme, useMediaQuery } from '@mui/material'

const Subscription: React.FC = () => {
  const subscriptions = Products.sort((a, b) => a.price - b.price)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

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
        <SubscriptionCard key={index} {...option} />
      ))}
    </Box>
  )
}

export default Subscription
