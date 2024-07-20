import { Typography } from '@mui/joy'
import { useTheme } from '@mui/joy/styles'
import { FC, Fragment, useEffect, useState } from 'react'
import {
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import {
  Company,
  getTotalOfTurnOver,
  TurnOver,
} from '../../../data/types/company'
import { PleaseSelectACompanyText } from '../../common/Texts'

type ChartProps = {
  company: Company | undefined
}

const Chart: FC<ChartProps> = ({ company }) => {
  const theme = useTheme()
  const [turnOver, setTurnOver] = useState<TurnOver>()

  useEffect(() => {
    if (company) {
      setTurnOver(getTotalOfTurnOver(company))
    }
  }, [company])

  const insertData = () => {
    const data: { date: number; amount: number }[] = []

    if (turnOver) {
      for (let i = 0; i < turnOver.date.length; i++) {
        const turnOverIndex = turnOver.turnOver[i]

        if (turnOverIndex !== null && !isNaN(turnOverIndex)) {
          if (turnOver.date.length > 1 && turnOver.turnOver.length > 1) {
            data.push({ date: turnOver.date[i], amount: turnOverIndex }) // The chart only accepts objects with date and amount
          }
        }
      }
    }

    return data
  }

  if (turnOver === undefined) {
    return <PleaseSelectACompanyText />
  }

  if (company === undefined) {
    return (
      <a style={{ display: 'flex', justifyContent: 'center' }}>
        Pas de données
      </a>
    )
  } else if (turnOver) {
    return (
      <Fragment>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography level="h4">Chiffre d&apos;affaire</Typography>
        </div>
        <ResponsiveContainer>
          <LineChart
            data={insertData()}
            margin={{
              top: 16,
              right: 16,
              bottom: 10,
              left: 16,
            }}
            style={{ borderRadius: 3 }}
          >
            <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary}>
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: 'middle',
                  fill: theme.palette.text.primary,
                }}
              >
                En Euro (€)
              </Label>
            </YAxis>
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.body,
                color: theme.palette.text.primary,
                border: 'none',
                borderRadius: 3,
              }}
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value) => {
                if (value === 0) {
                  return ['Pas de données']
                } else {
                  const formattedValue = new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(Number(value))
                  return [formattedValue, "Chiffre d'affaire"]
                }
              }}
            />
            <Line
              dot
              isAnimationActive
              dataKey="amount"
              strokeWidth={3}
              type="monotone"
              width={10}
            />
          </LineChart>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default Chart
