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
import { Box, Button, IconButton } from '@mui/material';
import Company, { CheckedStatus } from '../../data/company.ts';
import { StatutIcon, manageIsChecked } from '../StatutIcon/index.tsx';
import { useCompanyStore } from '../../store/companyStore.tsx';
import { toast } from 'react-toastify';
import { useCompanyFilterStore } from '../../store/filtersStore.tsx';
import { Page } from '../../data/companyDetails.tsx';
import { companyJsonToCompany } from '../../utils/companyJsonToCompany.tsx';
import { TableSkeleton } from '../Skeleton/index.tsx';
import { ErrorJwtAuth } from '../../data/errorAuthJwt.ts';
import useAuthStore from '../../store/authStore.tsx';

// https://www.material-react-table.com/
// Using this ?

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
}

export const columns: Column[] = [
  { id: 'checked', label: '', minWidth: 100, align: 'center' },
  { id: 'denomination', label: 'Denomination', minWidth: 170 },
  { id: 'phone', label: 'Téléphone', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'website', label: 'Site Web', minWidth: 170 },

  { id: 'social', label: 'Réseaux Sociaux', minWidth: 170 },

  { id: 'secteurActivite', label: 'Secteur d\'Activité', minWidth: 170 },
  { id: 'formeJuridique', label: 'Forme Juridique', minWidth: 170 },
  { id: 'adresse', label: 'Adresse', minWidth: 170 },
  { id: 'codePostal', label: 'Code Postal', minWidth: 170 },
  { id: 'ville', label: 'Ville', minWidth: 170 },
  { id: 'region', label: 'Région', minWidth: 170 },
  { id: 'dateImmatriculation', label: 'Date Immatriculation', minWidth: 170 },
];

// TODO: Replace this with the data from the API 
/*
const leader1 = new Leader(1, "JEAN", "Dupont", new Date("1990-01-01"), "06 00 00 00 00", "email", [{ id: 1, denomination: "Entreprise 1" }])
const leader2 = new Leader(2, "JOSEPHE", "Dupont", new Date("1990-01-01"), "06 00 00 00 00", "email", [{ id: 2, denomination: "Entreprise 1" }])
const leader3 = new Leader(3, "HENRI", "Dupont", new Date("1990-01-01"), "06 00 00 00 00", "email", [{ id: 4, denomination: "Entreprise 4" }])
const leader4 = new Leader(4, "EUDES", "Dupont", new Date("1990-01-01"), "06 00 00 00 00", "email", [{ id: 5, denomination: "Entreprise 5" }])
const leader5 = new Leader(5, "HERCUL", "Dupont", new Date("1990-01-01"), "06 00 00 00 00", "email", [{ id: 6, denomination: "Entreprise 6" }])
*/

interface Props {
  url: string;
}

/**
 * 
 * @param param0 Takes a callback function as a parameter and displays a table of companies
 * @returns A table of companies with their details
 */
export default function TableCompany({ url }: Props) {
  const [dataPagniation, setDataPagination] = React.useState({
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
  });

  const [companyData, setCompanyData] = React.useState<Company[]>([]);
  const { selectedCompany, setSelectedCompany } = useCompanyStore();
  const { setAuthUser, setRequestLoading } = useAuthStore();

  const [error, setError] = React.useState("");
  const { searchParams } = useCompanyFilterStore();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setCompanyData(null as unknown as Company[]);
        setSelectedCompany(null as unknown as Company);

        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/${url}page=${dataPagniation.page}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok && response.status === 200) {
          const data: Page<Company> = await response.json();

          const companies: Company[] = data.content.map((companyObj) =>
            companyJsonToCompany(companyObj)
          ).filter(Boolean) as Company[];

          const checkedDone = JSON.parse(localStorage.getItem('checkedDone') || '[]');
          const checkedToDo = JSON.parse(localStorage.getItem('checkedToDo') || '[]');

          const updatedCompanyData = companies.map((company) => {
            if (checkedDone.includes(company.getId())) {
              company.setChecked(CheckedStatus.Done);
            } else if (checkedToDo.includes(company.getId())) {
              company.setChecked(CheckedStatus.ToDo);
            } else {
              company.setChecked(CheckedStatus.NotDone);
            }
            return company;
          });

          setCompanyData(updatedCompanyData);
          setDataPagination((prevDataPagination) => ({ ...prevDataPagination, totalPages: data.totalPages }));
        }
        else {
          const errorData: ErrorJwtAuth = await response.json();
          if (response.status == 401) {
            setError(errorData.message);
            toast.error(`Erreur: ${errorData.message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      } catch (error: unknown) {
        console.log(error);
        toast.error(`Erreur lors de la récupération des entreprises: ${error}`, {
        });
      }
    };

    fetchData();
  }, [dataPagniation.page, searchParams, url, setSelectedCompany]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setDataPagination((prevDataPagination) => ({ ...prevDataPagination, page: newPage }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataPagination((prevDataPagination) => ({ ...prevDataPagination, rowsPerPage: +event.target.value, page: 0 }));
  };

  const handleDetailsClick = (company: Company) => {
    // If the company is the same as the selected one, do nothing to avoid re-rendering
    if (company !== selectedCompany) {
      setSelectedCompany(company);
      console.log('Company selected: ', selectedCompany);
    }
  };

  // TODO : Another function is in the file src/pages/Company/index.tsx
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
    manageIsChecked(company.getId(), newStatus);

    setCompanyData(companyData.map((item) =>
      item.getId() === company.getId() ? company : item
    ));

    return newStatus;
  };

  if (error !== "") {
    return (
      <div style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
        <h1>{error}</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setRequestLoading(true);
            setAuthUser(null);
            setRequestLoading(false);
          }}>
          Se reconnecter
        </Button>
      </div>
    );
  }
  if (companyData === null) {
    return <TableSkeleton columns={columns} />;
  }
  else if (companyData.length == 0) {
    return <a style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '19px',
      color: '#666',
      height: '100%',
    }}>
      Aucune entreprise trouvée
    </a>
  }
  else if (companyData !== null && Array.isArray(companyData) && typeof companyData[0].getAdresse === 'function') {
    return (
      <Box sx={{ position: 'relative', width: '100%', borderRadius: 3, overflow: 'auto', height: '100%' }}>
        <TableContainer sx={{}}>
          <Table stickyHeader aria-label="sticky table">
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
                .map((row) => {
                  return (
                    //Afficher les details de l'entreprise en cliquant dessus
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.getSiren()} onClick={() => handleDetailsClick(row)} style={{ cursor: 'pointer' }}>
                      <TableCell key="statut" align="center">
                        <IconButton style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
                          onClick={(e) => {
                            e.stopPropagation(); // Pour éviter de déclencher handleDetailsClick
                            row.setChecked(handleChangeStatut(row));
                          }}
                        >
                          <StatutIcon statut={row.getChecked()} />
                        </IconButton>
                      </TableCell>
                      {/* Slice to exclude the id */}
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
                        }
                        else if (column.id === 'checked') {
                          return (
                            <TableCell key={column.id} align={column.align} style={{ fontFamily: 'Poppins' }}>
                              <StatutIcon statut={row.getChecked()} />
                            </TableCell>
                          );
                        }
                        else if (column.id === 'dateImmatriculation') {
                          return (
                            <TableCell key={column.id} align={column.align} style={{ fontFamily: 'Poppins' }}>
                              {row.getDateImmatriculation() ?? "N/A"}
                            </TableCell>
                          );
                        }
                        else if (column.id === 'secteurActivite') {
                          return (
                            <TableCell key={column.id} align={column.align} style={{ fontFamily: 'Poppins' }}>
                              {row.getSecteurActivite() ?? "N/A"}
                            </TableCell>
                          );
                        }
                        else if (column.id === 'formeJuridique') {
                          return (
                            <TableCell key={column.id} align={column.align} style={{ fontFamily: 'Poppins' }}>
                              {row.getFormeJuridique() ?? "N/A"}
                            </TableCell>
                          );
                        }
                        else if (column.id === 'adresse') {
                          return (
                            <TableCell key={column.id} align={column.align} style={{ fontFamily: 'Poppins' }}>
                              {row.getAdresse() ?? "N/A"}
                            </TableCell>
                          );
                        }
                        else if (column.id === 'codePostal') {
                          return (
                            <TableCell key={column.id} align={column.align} style={{ fontFamily: 'Poppins' }}>
                              {row.getCodePostal() ?? "N/A"}
                            </TableCell>
                          );
                        }
                        else if (column.id === 'ville') {
                          return (
                            <TableCell key={column.id} align={column.align} style={{ fontFamily: 'Poppins' }}>
                              {row.getVille() ?? "N/A"}
                            </TableCell>
                          );
                        }
                        else if (column.id === 'region') {
                          return (
                            <TableCell key={column.id} align={column.align} style={{ fontFamily: 'Poppins' }}>
                              {row.getRegion()}
                            </TableCell>
                          );
                        }
                        else if (column.id === 'denomination') {
                          return (
                            <TableCell key={column.id} align={column.align} style={{ fontFamily: 'Poppins' }}>
                              {row.getDenomination() ?? "N/A"}
                            </TableCell>
                          );
                        }
                        else if (column.id === 'phone') {
                          return (
                            <TableCell key={column.id} align={column.align} style={{ fontFamily: 'Poppins' }}>
                              {row.getPhone() ?? "N/A"}
                            </TableCell>
                          );
                        }
                        else if (column.id === 'email') {
                          return (
                            <TableCell key={column.id} align={column.align} style={{ fontFamily: 'Poppins' }}>
                              {row.getEmail() ?? "N/A"}
                            </TableCell>
                          );
                        }
                        else if (column.id === 'website') {
                          return (
                            <TableCell key={column.id} align={column.align} style={{ fontFamily: 'Poppins', maxWidth: '50px',maxHeight: '50px',overflow: 'hidden' }} onClick={(e) => {
                              if (e.target === e.currentTarget && row.getWebsite() != null && row.getWebsite() != "") {
                                e.stopPropagation(); // Pour éviter de déclencher handleDetailsClick
                                window.open(row.getWebsite(), '_blank');
                              }
                            }}>
                              {row.getWebsite() ?? "N/A"}
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
          rowsPerPageOptions={[10]}
          component="div"
          count={dataPagniation.totalPages * dataPagniation.rowsPerPage}
          rowsPerPage={dataPagniation.rowsPerPage}
          page={dataPagniation.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    );
  }
}