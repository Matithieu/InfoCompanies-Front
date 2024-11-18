import { Button } from '@/components/ui/button copy'
import AddIcon from '@mui/icons-material/Add'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Typography } from '@mui/material'
import { FC } from 'react'

const Test: FC = () => {
  return (
    <>
      <div>
        <Button>
          <AddIcon style={{ fontSize: '1.2rem' }} />
        </Button>
      </div>

      <div style={{ padding: 10 }} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Button style={{ borderRadius: '50%' }}>
          <KeyboardArrowLeftIcon />
        </Button>
        <Typography variant="body2"> 1 / 10 </Typography>
        <Button style={{ borderRadius: '50%' }}>
          <KeyboardArrowRightIcon />
        </Button>
      </div>
    </>
  )
}

export default Test
