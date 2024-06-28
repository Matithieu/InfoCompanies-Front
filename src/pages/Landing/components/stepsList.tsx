import { Paper } from '@mui/material'

interface Step {
  id: string
  description: string
  action?: () => void
}

const Steps: Step[] = [
  {
    id: '1',
    description: 'Filtrez selon vos besoins',
  },
  {
    id: '2',
    description: "Marquez l'entreprise",
  },
  {
    id: '3',
    description: 'Notez la pour plus tard',
  },
  {
    id: '4',
    description: 'Ne retombez pas sur une entreprise déjà prospectée',
  },
]

interface StepsListProps {
  onStepClick: (stepId: number) => void
}

const StepsList: React.FC<StepsListProps> = ({ onStepClick }) => {
  return (
    <div>
      <ul>
        {Steps.map((step) => (
          <li>
            <div
              style={{
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #e44141, #4f2af3)',
                color: 'white',
                margin: '20px' /* Adjust as needed */,
                cursor: 'pointer',
              }}
            >
              <span
                key={step.id}
                style={{
                  width: '100%',
                  background: '#050510',
                  margin: '2px',
                  padding: '10px 20px',
                  display: 'inline-block',
                  borderRadius: 'inherit',
                  color: 'white',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
                onClick={() => {
                  onStepClick(parseInt(step.id))
                }}
              >
                {step.description}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StepsList
