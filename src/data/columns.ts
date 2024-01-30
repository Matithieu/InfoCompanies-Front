export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
}
export const columnsTableCompany: Column[] = [
  { id: "checked", label: "", minWidth: 100, align: "center" },
  { id: "denomination", label: "Denomination", minWidth: 170 },
  { id: "phone", label: "Téléphone", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "website", label: "Site Web", minWidth: 170 },

  { id: "social", label: "Réseaux Sociaux", minWidth: 170 },

  { id: "secteurActivite", label: "Secteur d'Activité", minWidth: 170 },
  { id: "formeJuridique", label: "Forme Juridique", minWidth: 170 },
  { id: "adresse", label: "Adresse", minWidth: 170 },
  { id: "codePostal", label: "Code Postal", minWidth: 170 },
  { id: "ville", label: "Ville", minWidth: 170 },
  { id: "region", label: "Région", minWidth: 170 },
  { id: "dateImmatriculation", label: "Date Immatriculation", minWidth: 170 },
];
