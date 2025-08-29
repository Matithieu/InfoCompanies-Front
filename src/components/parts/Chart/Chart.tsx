import { NoAvailableDataText } from '@/components/common/Texts/NoContentAvailable/NoContentAvailable'
import { CompanyDTO } from '@/types/index.types'
import { getTotalTurnOver } from '@/utils/company.util'
import { Typography } from '@mui/joy'
import { useTheme } from '@mui/joy/styles'
import { FC, Fragment } from 'react'
import {
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import commonMessages from '../../../services/intl/common.messages'
import { formatMessage } from '../../../services/intl/intl'
import { PleaseSelectACompanyText } from '../../common/Texts/PleaseSelectACompanyText'
import chartMessages from './chart.messages'

type ChartProps = {
  company: CompanyDTO | undefined
}

const Chart: FC<ChartProps> = ({ company }) => {
  const theme = useTheme()

  const totalTurnOver = company ? getTotalTurnOver(company) : undefined

  if (company === undefined) {
    return <PleaseSelectACompanyText />
  }

  if (totalTurnOver!.every((data) => data.amount === 0)) {
    return <NoAvailableDataText />
  }

  return (
    <Fragment>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography level="h4">
          {formatMessage(commonMessages.turnOver)}
        </Typography>
      </div>
      <ResponsiveContainer>
        <LineChart
          data={totalTurnOver}
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
              {formatMessage(chartMessages.yAxisLabel)}
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
                return [
                  <Typography key="no-data" color="warning">
                    {formatMessage(commonMessages.noAvailableData)}
                  </Typography>,
                ]
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

export default Chart
