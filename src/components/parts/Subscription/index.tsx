import { Box } from '@mui/material'
import { FC, useState } from 'react'

import { products } from '../../../data/Stripe/subscription'
import SubscriptionCard from './components/SubscriptionCard'

const Subscriptions: FC = () => {
  const [buttonClicked, setButtonClicked] = useState(false)

  const subscriptions = products.sort((a, b) => a.price - b.price)

  const handleCardClick = () => {
    setButtonClicked(true)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row' },
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

export default Subscriptions
