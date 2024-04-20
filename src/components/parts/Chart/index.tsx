import * as React from "react"
import { Typography } from "@mui/joy"
import {
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { getTotalOfTurnOver,TurnOver } from "../../../data/types/company"
import { useCompanyStore } from "../../../store/companyStore"

import { useTheme } from "@mui/joy/styles"

export default function Chart() {
  const theme = useTheme()
  const { selectedCompany } = useCompanyStore()
  const [turnOver, setTurnOver] = React.useState<TurnOver | null>(null)

  React.useEffect(() => {
    if (selectedCompany !== null) {
      setTurnOver(getTotalOfTurnOver(selectedCompany))
      console.log(turnOver)
    } else {
      setTurnOver(null as unknown as TurnOver)
    }
  }, [selectedCompany, setTurnOver])

  function insertData() {
    const data: { date: string; amount: number }[] = []

    if (turnOver !== null) {
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

  if (turnOver === null) {
    return (
      <a style={{ fontSize: "19px" }}>Veuillez sélectionner une entreprise</a>
    )
  }

  if (
    selectedCompany !== null &&
    getTotalOfTurnOver(selectedCompany).turnOver.length === 0
  ) {
    return (
      <a style={{ fontSize: "19px" }}>Pas de données pour cette entreprise</a>
    )
  } else {
    return (
      <React.Fragment>
        <Typography level="h4">Chiffre d'affaire</Typography>
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
                  textAnchor: "middle",
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
                border: "none",
                borderRadius: 3,
              }}
              cursor={{ strokeDasharray: "3 3" }}
              formatter={(value) => {
                if (value === 0) {
                  return ["Pas de données"]
                } else {
                  const formattedValue = new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
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
      </React.Fragment>
    )
  }
}
