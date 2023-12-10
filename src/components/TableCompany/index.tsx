import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box } from '@mui/material';
import Company, { CheckedStatus } from '../../data/company.ts';
import ChiffreAffaire from '../../data/chiffreDaffaire.tsx';
import Leader from '../../data/leader.tsx';
import { loadCompanyFromLocalStorage } from '../../utils/loadCompany.tsx';
import { StatutIcon, manageIsChecked } from '../StatutIcon/index.tsx';
import { useCompanyStore } from '../../store/companyStore.tsx';


interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
}

const columns: readonly Column[] = [
  { id: 'checked', label: 'O', minWidth: 100, align: 'center' },
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
  CheckedStatus.Done,
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
  CheckedStatus.ToDo,
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

export const listOfCompanies: Company[] = [
  company1,
  company2
];

// TODO: Replace this with a message saying that no data was found
export const initialCompanyData: Company[] = [
  ...(loadCompanyFromLocalStorage("companyDetailsDashboard") || listOfCompanies),
];

/**
 * 
 * @param param0 Takes a callback function as a parameter and displays a table of companies
 * @returns A table of companies with their details
 */
export default function TableCompany({ onDetailsClick, listOfCompanies }: { onDetailsClick: (company: Company) => void, listOfCompanies: Company[] }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [companyData, setCompanyData] = React.useState(listOfCompanies);

  const { selectedCompany, setSelectedCompany } = useCompanyStore();


  React.useEffect(() => {
    // Charger les listes pour les statuts "Done" et "ToDo" depuis le localStorage
    const checkedDone = JSON.parse(localStorage.getItem('checkedDone') || '[]');
    const checkedToDo = JSON.parse(localStorage.getItem('checkedToDo') || '[]');

    // Mettre à jour l'état des entreprises en fonction des listes "Done" et "ToDo"
    const updatedCompanyData = initialCompanyData.map((company) => {
      if (checkedDone.includes(company.getSiren())) {
        company.setChecked(CheckedStatus.Done);
      } else if (checkedToDo.includes(company.getSiren())) {
        company.setChecked(CheckedStatus.ToDo);
      } else {
        company.setChecked(CheckedStatus.NotDone);
      }
      return company; // Retourner l'objet entreprise mis à jour
    });

    setCompanyData(updatedCompanyData);
  }, []);

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

  // TODO : Another function is in the file src/pages/Company/Component/index.tsx


  const handleChangeStatut = (company: Company) => {
    let newStatus: CheckedStatus;

    if (company.getChecked() === CheckedStatus.NotDone) {
      newStatus = CheckedStatus.ToDo;
    } else if (company.getChecked() === CheckedStatus.ToDo) {
      newStatus = CheckedStatus.Done;
    } else {
      newStatus = CheckedStatus.NotDone;
    }

    company.setChecked(newStatus);
    manageIsChecked(company.getSiren(), newStatus);

    setCompanyData(companyData.map((item) =>
      item.getSiren() === company.getSiren() ? company : item
    ));

    return newStatus;
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
                    <TableCell key="statut" align="center">
                      <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
                        onClick={(e) => {
                          e.stopPropagation(); // Pour éviter de déclencher handleDetailsClick
                          row.setChecked(handleChangeStatut(row));
                        }}
                      >
                        <StatutIcon statut={row.getChecked()} />
                      </button>
                    </TableCell>
                    {/* Slice to exclude favorites */}
                    {columns.slice(1).map((column) => {
                      if (column.id === 'social') {
                        return (
                          <TableCell key={column.id} align={column.align} style={{ fontFamily: 'Poppins' }}>
                            {row.getFacebook() && <FacebookIcon style={{ color: "#3b5998" }} />}
                            {row.getTwitter() && <TwitterIcon style={{ color: "#1DA1F2" }} />}
                            {row.getLinkedin() && <LinkedInIcon style={{ color: "#0e76a8" }} />}
                            {row.getYoutube() && <YouTubeIcon style={{ color: 'red' }} />}
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