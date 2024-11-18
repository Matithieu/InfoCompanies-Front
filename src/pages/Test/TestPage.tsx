import { Button } from '@/components/ui/button copy'
import AddIcon from '@mui/icons-material/Add'
import { Typography } from '@mui/material'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
        <Button size="icon">
          <ChevronLeft />
        </Button>
        <div style={{ padding: 10 }}>
          <Typography variant="body2"> 1 / 10 </Typography>
        </div>
        <Button size="icon">
          <ChevronRight />
        </Button>
      </div>
    </>
  )
}

export default Test
