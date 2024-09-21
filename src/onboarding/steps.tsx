import { Step } from 'react-joyride'

const joyrideSteps: Array<Step> = [
  {
    target: '#joyride-step-1',
    content:
      'Voici le dashboard, vous pouvez selectionner une entreprise en cliquant sur une ligne !',
  },
  {
    target: '#joyride-step-2',
    content:
      'Vous pouvez filtrer les entreprises en fonction de critères spécifiques.',
    placement: 'bottom',
  },
  {
    target: '#joyride-step-3',
    content:
      "Cliquez directement sur un lien web ou bien une icône pour accéder à l'entreprise.",
  },
  {
    target: '#joyride-step-4',
    content:
      'Ajoutez l\'entreprise en "To Do" ou en "Done" pour la mettre de coté.',
  },
]

export default joyrideSteps
