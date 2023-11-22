import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';

export default function Chart({ companyCharts }) {
  const theme = useTheme();


  function createData(date, amount) {
    return { date, amount }; // Utilisez "amount" à la place de "chiffreAffaire"
  }


  function insertData(companyCharts) {
    const data: any[] = [];
    const chiffreAffaireData = companyCharts.chiffreAffaire;

    if (chiffreAffaireData && chiffreAffaireData.date && chiffreAffaireData.chiffreAffaire) {
      const dates = chiffreAffaireData.date;
      const chiffreAffaireValues = chiffreAffaireData.chiffreAffaire;

      for (let i = 0; i < dates.length; i++) {
        const chiffreAffaire = parseFloat(chiffreAffaireValues[i]);
        if (!isNaN(chiffreAffaire)) {
          data.push(createData(dates[i], chiffreAffaire));
        }
      }
    }

    return data;
  }


  if (companyCharts === null) {
    return (
      <a style={{ fontSize: '19px', fontFamily: 'Poppins' }}>Veuillez sélectionner une entreprise</a>
    );
  } else {
    return (
      <React.Fragment>
        <text style={{ display: "flex", fontFamily: 'Poppins', justifyContent: 'center', marginTop:5 }}>Chiffre d'affaire</text>
        <ResponsiveContainer>
          <LineChart
            data={insertData(companyCharts)}
            margin={{
              top: 16,
              right: 16,
              bottom: 10,
              left: 16,
            }}
            style={{ fontFamily: 'Poppins', borderRadius: 3 }}
          >
            <XAxis
              dataKey="date"
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            />
            <YAxis
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            >
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: 'middle',
                  fill: theme.palette.text.primary,
                  ...theme.typography.body1,
                  fontFamily: 'Poppins',
                }}
              >
                En Euro (€)
              </Label>
            </YAxis>
            <Line
              isAnimationActive={true}
              type="monotone"
              dataKey="amount"
              stroke={theme.palette.primary.main}
              strokeWidth={3}
              dot={true}
              width={10}
            />
          </LineChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
}
