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
import { Box } from '@mui/material';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'favoris', label: 'Favoris', minWidth: 100, align: 'right' },
  { id: 'denomination', label: 'Denomination', minWidth: 170 },
  { id: 'forme_juridique', label: 'Forme Juridique', minWidth: 170 },
  { id: 'secteur_d_activite', label: 'Secteur d\'Activité', minWidth: 170 },
  { id: 'adresse', label: 'Adresse', minWidth: 170 },
  { id: 'code_postal', label: 'Code Postal', minWidth: 170 },
  { id: 'ville', label: 'Ville', minWidth: 170 },
  { id: 'num_dept', label: 'Numéro Département', minWidth: 170 },
  { id: 'departement', label: 'Département', minWidth: 170 },
  { id: 'region', label: 'Région', minWidth: 170 },
  { id: 'code_greffe', label: 'Code Greffe', minWidth: 170 },
  { id: 'greffe', label: 'Greffe', minWidth: 170 },
  { id: 'date_immatriculation', label: 'Date Immatriculation', minWidth: 170 },
  { id: 'date_radiation', label: 'Date Radiation', minWidth: 170 },
  { id: 'statut', label: 'Statut', minWidth: 170 },
  { id: 'geolocalisation', label: 'Geolocalisation', minWidth: 170 },
  { id: 'phone', label: 'Téléphone', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'website', label: 'Site Web', minWidth: 170 },
  { id: 'address', label: 'Adresse', minWidth: 170 },
  { id: 'creationDate', label: 'Date de création', minWidth: 170 },

];

interface CompanyData {
  favoris: boolean;
  denomination: string;
  siren: string;
  nic: string;
  forme_juridique: string;
  code_ape: string;
  secteur_d_activite: string;
  adresse: string;
  code_postal: string;
  ville: string;
  num_dept: string;
  departement: string;
  region: string;
  code_greffe: string;
  greffe: string;
  date_immatriculation: string;
  date_radiation: string | null;
  statut: string;
  geolocalisation: {
    lon: number;
    lat: number;
  };
  phone: string,
  email: string,
  website: string,
  address: string,
  creationDate: string,
  chiffreAffaire: {
    date: string[],
    chiffreAffaire: string[],
  }
  leaders: {
    nom: string[],
    dateNaissance: string[],
  }
}

const initialCompanyData: CompanyData[] = [
  {
    favoris: false,
    denomination: "LA MIE'STERIEUSE",
    siren: "948404819",
    nic: "00013",
    forme_juridique: "Société par actions simplifiée",
    code_ape: "0000Z",
    secteur_d_activite: "EN INSTANCE DE CHIFFREMENT",
    adresse: "213 ROUTE DE MACORNAY",
    code_postal: "39000",
    ville: "LONS LE SAUNIER",
    num_dept: "39",
    departement: "Jura",
    region: "Bourgogne-Franche-Comté",
    code_greffe: "3902",
    greffe: "LONS-LE-SAUNIER",
    date_immatriculation: "2023-02-13",
    date_radiation: null,
    statut: "B",
    geolocalisation: {
      lon: 5.545786,
      lat: 46.667538,
    },
    phone: '06 00 00 00 00',
    email: "email@email.com",
    website: "www.website.com",
    address: "1 rue de la rue",
    creationDate: "01/01/2021",
    chiffreAffaire: {
      date: ["01/01/2021", "01/01/2022", "01/01/2023"],
      chiffreAffaire: ["10000", "20000", "30000"]
    },
    leaders: {
      nom: ["Jean", "Paul", "Jacques", "Pierre"],
      dateNaissance: ["01/01/2000", "02/02/2000", "03/03/2000", "04/04/2000"],
    }
  },
  {
    favoris: false,
    denomination: "Nom de l'entreprise 2",
    siren: "123456789",
    nic: "00001",
    forme_juridique: "Société anonyme",
    code_ape: "1234A",
    secteur_d_activite: "Service informatique",
    adresse: "123 Rue de l'Entreprise",
    code_postal: "12345",
    ville: "Ville Entreprise",
    num_dept: "12",
    departement: "Département Entreprise",
    region: "Région Entreprise",
    code_greffe: "6789",
    greffe: "Greffe Entreprise",
    date_immatriculation: "2022-01-01",
    date_radiation: "2023-03-03",
    statut: "A",
    geolocalisation: {
      lon: 12.345678,
      lat: 34.567890,
    },
    phone: '06 00 00 00 00',
    email: "email@gmail.com",
    website: "www.website.com",
    address: "1 rue de la rue",
    creationDate: "01/01/2021",
    chiffreAffaire: {
      date: ["01/01/2021", "01/01/2022", "01/01/2023"],
      chiffreAffaire: ["10000", "1000", "30000"]
    },
    leaders: {
      nom: ["Clément", "Mathieu", "Pierre"],
      dateNaissance: ["01/01/2000", "02/02/2000", "03/03/2000"],
    }
  },
  // Add more company data as needed...
];

export default function TableCompany({ onDetailsClick }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [companyData, setCompanyData] = React.useState(initialCompanyData);

  React.useEffect(() => {
    // Chargement initial des données d'entreprise depuis le localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedCompanyData = initialCompanyData.map((company) => ({
      ...company,
      favoris: favorites.includes(company.denomination),
    }));
    setCompanyData(updatedCompanyData);
  }, []); // Exécutez cela une seule fois lors du chargement initial du composant

  const manageFavorites = (companyName: string) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(companyName);
    if (index === -1) {
      // Si l'entreprise n'est pas encore enregistrée en tant que favori, ajoutez-la
      favorites.push(companyName);
    } else {
      // Sinon, supprimez-la
      favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log('Favoris mis à jour:', favorites);

    // Mettez à jour l'état local companyData avec l'information des favoris
    const updatedCompanyData = companyData.map((company) => ({
      ...company,
      favoris: favorites.includes(company.denomination),
    }));
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
    }
  };

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ width: '100%', minHeight: 380, height: '100%', borderRadius:3 }}>
        <Table stickyHeader aria-label="sticky table" style={{}}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontFamily: 'Poppins', fontSize: 16,  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {companyData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  //Afficher les details de l'entreprise en cliquant dessus

                  <TableRow hover role="checkbox" tabIndex={-1} key={row.siren} onClick={() => handleDetailsClick(row)} style={{ cursor: 'pointer' }}>
                    <TableCell key="favoris" align="center">
                      <button style={{ border: 'none', backgroundColor: 'transparent' }}
                        onClick={() => {
                          manageFavorites(row.denomination);
                        }}
                      >
                        {row.favoris ? <StarIcon /> : <StarBorderOutlinedIcon />}
                      </button>
                    </TableCell>
                    {columns.slice(1).map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{ fontFamily: 'Poppins' }}>
                          {column.id === 'geolocalisation'
                            ? `Lon: ${row.geolocalisation.lon}, Lat: ${row.geolocalisation.lat}`
                            : value}
                        </TableCell>
                      );
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
