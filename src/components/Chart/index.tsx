import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Company from '../../data/company';
import ChiffreAffaire from '../../data/chiffreDaffaire';
import { useCompanyContext } from '../../context/CompanyContext';

export default function Chart() {
  const theme = useTheme();
  // Only use selectedCompany. Don't use setSelectedCompany
  const { selectedCompany } = useCompanyContext();
  const [companyDetails, setCompanyDetails] = React.useState<ChiffreAffaire | null>(null);

  React.useEffect(() => {
    if (selectedCompany !== null && selectedCompany instanceof Company && typeof selectedCompany.getChiffreAffaire === 'function') {
      setCompanyDetails(selectedCompany.getChiffreAffaire());
    } else {
      setCompanyDetails(null as unknown as ChiffreAffaire);
    }
  }, [selectedCompany]);

  function insertData() {
    // Data cannot be a class instance, so we have to convert it to an array
    const data: { date: string; amount: number }[] = [];
    const chiffreAffaireData = companyDetails;

    if (chiffreAffaireData && chiffreAffaireData.getDate() && chiffreAffaireData.getChiffreAffaire()) {
      const dates = chiffreAffaireData.getDate();
      const chiffreAffaireValues = chiffreAffaireData.getChiffreAffaire();

      for (let i = 0; i < dates.length; i++) {
        const chiffreAffaire = parseFloat(chiffreAffaireValues[i]);
        if (!isNaN(chiffreAffaire)) {
          data.push({ date: dates[i], amount: chiffreAffaire });
        }
      }
    }
    return data;
  }

  if (companyDetails === null) {
    return <a style={{ fontSize: '19px', fontFamily: 'Poppins' }}>Veuillez sélectionner une entreprise</a>;
  }
  if (companyDetails.getChiffreAffaire().length === 0) {
    return <a style={{ fontSize: '19px', fontFamily: 'Poppins' }}>Pas de données pour cette entreprise</a>;
  }
  else {
    return (
      <React.Fragment>
        <div style={{ display: "flex", fontFamily: 'Poppins', justifyContent: 'center', marginTop: 5 }}>Chiffre d'affaire</div>
        <ResponsiveContainer>
          <LineChart
            data={insertData()}
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