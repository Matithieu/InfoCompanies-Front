import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

import { Box } from '@mui/material';
import Company from '../../data/company.ts';
import ChiffreAffaire from '../../data/chiffreDaffaire.tsx';
import Leader from '../../data/leader.tsx';
import { useCompanyContext } from '../../context/CompanyContext.tsx';
import { loadCompanyFromLocalStorage } from '../../utils/loadCompany.tsx';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'favoris', label: 'Favoris', minWidth: 100, align: 'right' },
  { id: 'denomination', label: 'Denomination', minWidth: 170 },
  { id: 'phone', label: 'Téléphone', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'website', label: 'Site Web', minWidth: 170 },

  { id: 'social', label: 'Réseaux Sociaux', minWidth: 170 },

  { id: 'secteur_d_activite', label: 'Secteur d\'Activité', minWidth: 170 },
  { id: 'forme_juridique', label: 'Forme Juridique', minWidth: 170 },
  { id: 'adresse', label: 'Adresse', minWidth: 170 },
  { id: 'code_postal', label: 'Code Postal', minWidth: 170 },
  { id: 'ville', label: 'Ville', minWidth: 170 },
  { id: 'num_dept', label: 'Numéro Département', minWidth: 170 },
  { id: 'departement', label: 'Département', minWidth: 170 },
  { id: 'region', label: 'Région', minWidth: 170 },
  { id: 'date_immatriculation', label: 'Date Immatriculation', minWidth: 170 },
  { id: 'address', label: 'Adresse', minWidth: 170 },
  { id: 'creationDate', label: 'Date de création', minWidth: 170 },

];

// TODO: Replace this with the data from the API
const leader1 = new Leader(1, "JEAN", "Dupont", new Date("1990-01-01"), "06 00 00 00 00", "email", [{ id: 1, denomination: "Entreprise 1" }])
const leader2 = new Leader(2, "JOSEPHE", "Dupont", new Date("1990-01-01"), "06 00 00 00 00", "email", [{ id: 2, denomination: "Entreprise 1" }])
const leader3 = new Leader(3, "HENRI", "Dupont", new Date("1990-01-01"), "06 00 00 00 00", "email", [{ id: 4, denomination: "Entreprise 4" }])
const leader4 = new Leader(4, "EUDES", "Dupont", new Date("1990-01-01"), "06 00 00 00 00", "email", [{ id: 5, denomination: "Entreprise 5" }])
const leader5 = new Leader(5, "HERCUL", "Dupont", new Date("1990-01-01"), "06 00 00 00 00", "email", [{ id: 6, denomination: "Entreprise 6" }])

export const company1 = new Company(
  false,
  "LA MIE'STERIEUSE",
  "948404819",
  "00013",
  "Société par actions simplifiée",
  "0000Z",
  "EN INSTANCE DE CHIFFREMENT",
  "213 ROUTE DE MACORNAY",
  "39000",
  "LONS LE SAUNIER",
  "39",
  "Jura",
  "Bourgogne-Franche-Comté",
  "3902",
  "LONS-LE-SAUNIER",
  "2023-02-13",
  "2024",
  "B",
  {
    "lon": 5.545786,
    "lat": 46.667538
  },
  '06 00 00 00 00',
  "email@email.com",
  "www.website.com",
  "",
  "facebook.com",
  "",
  "linkdin",
  '',
  "01/01/2021",
  new ChiffreAffaire(["01/01/2021", "01/01/2022", "01/01/2023"], ["100", "200", "300"]),
  [
    leader1,
    leader2
  ]
);

export const company2 = new Company(
  false,
  "Nom de l'entreprise 2",
  "123456789",
  "00001",
  "Société anonyme",
  "1234A",
  "Service informatique",
  "123 Rue de l'Entreprise",
  "12345",
  "Ville Entreprise",
  "12",
  "Département Entreprise",
  "Région Entreprise",
  "6789",
  "Greffe Entreprise",
  "2022-01-01",
  "2023-03-03",
  "A",
  {
    "lon": 12.345678,
    "lat": 34.567890
  },
  '06 00 00 00 00',
  "email@gmail.com",
  "www.website.com",
  "1 rue de la rue",
  "www.youtube.com",
  "www.facebook.com",
  "www.twitter.com",
  "www.linkedin.com",
  "01/01/2021",
  new ChiffreAffaire(["01/01/2021", "01/01/2022", "01/01/2023"], ["10000", "1000", "30000"]),
  []
);

const initialCompanyData : Company[] = [
  ...(loadCompanyFromLocalStorage("companyDetailsDashboard") || []),
];

export const listOfCompanies: Company[] = [
  company1,
  company2
];

/**
 * 
 * @param param0 Takes a callback function as a parameter and displays a table of companies
 * @returns A table of companies with their details
 */
export default function TableCompany({ onDetailsClick }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [companyData, setCompanyData] = React.useState(initialCompanyData);

  const { selectedCompany, setSelectedCompany } = useCompanyContext();


  React.useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedCompanyData = initialCompanyData.map((company) => {
      // Update 'favoris' property for each company
      const isFavorite = favorites.includes(company.getDenomination());
      company.setFavoris(isFavorite);
      return company; // Return the updated company object
    });
    setCompanyData(updatedCompanyData);
  }, []);

  // TODO : Another function is in the file src/pages/Company/Component/index.tsx
  const manageFavorites = (companySiren: string) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(companySiren);
    if (index === -1) {
      // Si l'entreprise n'est pas encore enregistrée en tant que favori, ajoutez-la
      favorites.push(companySiren);
    } else {
      // Sinon, supprimez-la
      favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log('Favoris mis à jour:', favorites);

    // Mettez à jour l'état local companyData avec l'information des favoris
    const updatedCompanyData = initialCompanyData.map((company) => {
      // Update 'favoris' property for each company
      const isFavorite = favorites.includes(company.getSiren());
      company.setFavoris(isFavorite);
      return company; // Return the updated company object
    });
    setCompanyData(updatedCompanyData);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDetailsClick = (company) => {
    // Appelez la fonction de rappel lorsque l'utilisateur clique sur une ligne
    if (onDetailsClick) {
      onDetailsClick(company);
      setSelectedCompany(company);
      console.log('Company selected: ', selectedCompany);
    }
  };

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ width: '100%', minHeight: 380, height: '100%', borderRadius: 3 }}>
        <Table stickyHeader aria-label="sticky table" style={{}}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontFamily: 'Poppins', fontSize: 16, }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {companyData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  //Afficher les details de l'entreprise en cliquant dessus
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.getSiren()} onClick={() => handleDetailsClick(row)} style={{ cursor: 'pointer' }}>
                    <TableCell key="favoris" align="center">
                      <button style={{ border: 'none', backgroundColor: 'transparent' }}
                        onClick={() => {
                          manageFavorites(row.getSiren());
                        }}
                      >
                        {row.getFavoris() ? <StarIcon /> : <StarBorderOutlinedIcon />}
                      </button>
                    </TableCell>
                    {columns.slice(1).map((column) => {
                      if (column.id === 'social') {
                        return (
                          <TableCell key={column.id} align={column.align} style={{ fontFamily: 'Poppins' }}>
                            {row.getFacebook() && <FacebookIcon />}
                            {row.getTwitter() && <TwitterIcon />}
                            {row.getLinkedin() && <LinkedInIcon />}
                            {row.getYoutube() && <YouTubeIcon />}
                          </TableCell>
                        );
                      } else {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} style={{ fontFamily: 'Poppins' }}>
                            {column.id === 'geolocalisation'
                              ? `Lon: ${row.getGeolocalisation[0]}, Lat: ${row.getGeolocalisation[1]}`
                              : value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={companyData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ fontFamily: 'Poppins' }}
      />
    </Box>
  );
}