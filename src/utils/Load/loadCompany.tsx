import Company, { CheckedStatus } from "../../data/company";

export function loadCompanyFromLocalStorage(key: string) {
  const companyData = localStorage.getItem(key);
  if (!companyData && companyData === "" && companyData === null) {
    return null;
  }

  if (
    companyData != "undefined" &&
    companyData != undefined &&
    companyData != null
  ) {
    console.log("Company data format is valid");
    const companyObjs = JSON.parse(companyData);
    return companyObjs.map(
      (companyObj: {
        id: number;
        denomination: string;
        siren: string;
        nic: string;
        formeJuridique: string;
        codeAPE: string;
        adresse: string;
        codePostal: string;
        ville: string;
        region: string;
        dateImmatriculation: string;
        dateRadiation: string;
        checked: CheckedStatus;
        dateClotureExercice1_2018: string;
        CA1_2018: number;
        resultat1_2018: number;
        dateClotureExercice2_2018: string;
        CA2_2018: number;
        resultat2_2018: number;
        dateClotureExercice3_2018: string;
        CA3_2018: number;
        resultat3_2018: number;
        dateClotureExercice1_2019: string;
        CA1_2019: number;
        resultat1_2019: number;
        dateClotureExercice2_2019: string;
        CA2_2019: number;
        resultat2_2019: number;
        dateClotureExercice3_2019: string;
        CA3_2019: number;
        resultat3_2019: number;
        dateClotureExercice1_2020: string;
        CA1_2020: number;
        resultat1_2020: number;
        dateClotureExercice2_2020: string;
        CA2_2020: number;
        resultat2_2020: number;
        dateClotureExercice3_2020: string;
        CA3_2020: number;
        resultat3_2020: number;
        dateClotureExercice1_2021: string;
        CA1_2021: number;
        resultat1_2021: number;
        dateClotureExercice2_2021: string;
        CA2_2021: number;
        resultat2_2021: number;
        dateClotureExercice3_2021: string;
        CA3_2021: number;
        resultat3_2021: number;
        dateClotureExercice1_2022: string;
        CA1_2022: number;
        resultat1_2022: number;
        dateClotureExercice2_2022: string;
        CA2_2022: number;
        resultat2_2022: number;
        dateClotureExercice3_2022: string;
        CA3_2022: number;
        resultat3_2022: number;
        dateClotureExercice1_2023: string;
        CA1_2023: number;
        resultat1_2023: number;
        dateClotureExercice2_2023: string;
        CA2_2023: number;
        resultat2_2023: number;
        dateClotureExercice3_2023: string;
        CA3_2023: number;
        resultat3_2023: number;
        secteurActivite: string;
        phone: string;
        website: string;
        reviews: string;
        schedule: string;
        instagram: string;
        facebook: string;
        twitter: string;
        linkedin: string;
        youtube: string;
        email: string;
        dateOfScrapping: string;
      }) =>
        new Company(
          companyObj.id,
          companyObj.denomination,
          companyObj.siren,
          companyObj.nic,
          companyObj.formeJuridique,
          companyObj.codeAPE,
          companyObj.adresse,
          companyObj.codePostal,
          companyObj.ville,
          companyObj.region,
          companyObj.dateImmatriculation,
          companyObj.dateRadiation,
          companyObj.checked,
          companyObj.dateClotureExercice1_2018,
          companyObj.CA1_2018,
          companyObj.resultat1_2018,
          companyObj.dateClotureExercice2_2018,
          companyObj.CA2_2018,
          companyObj.resultat2_2018,
          companyObj.dateClotureExercice3_2018,
          companyObj.CA3_2018,
          companyObj.resultat3_2018,
          companyObj.dateClotureExercice1_2019,
          companyObj.CA1_2019,
          companyObj.resultat1_2019,
          companyObj.dateClotureExercice2_2019,
          companyObj.CA2_2019,
          companyObj.resultat2_2019,
          companyObj.dateClotureExercice3_2019,
          companyObj.CA3_2019,
          companyObj.resultat3_2019,
          companyObj.dateClotureExercice1_2020,
          companyObj.CA1_2020,
          companyObj.resultat1_2020,
          companyObj.dateClotureExercice2_2020,
          companyObj.CA2_2020,
          companyObj.resultat2_2020,
          companyObj.dateClotureExercice3_2020,
          companyObj.CA3_2020,
          companyObj.resultat3_2020,
          companyObj.dateClotureExercice1_2021,
          companyObj.CA1_2021,
          companyObj.resultat1_2021,
          companyObj.dateClotureExercice2_2021,
          companyObj.CA2_2021,
          companyObj.resultat2_2021,
          companyObj.dateClotureExercice3_2021,
          companyObj.CA3_2021,
          companyObj.resultat3_2021,
          companyObj.dateClotureExercice1_2022,
          companyObj.CA1_2022,
          companyObj.resultat1_2022,
          companyObj.dateClotureExercice2_2022,
          companyObj.CA2_2022,
          companyObj.resultat2_2022,
          companyObj.dateClotureExercice3_2022,
          companyObj.CA3_2022,
          companyObj.resultat3_2022,
          companyObj.dateClotureExercice1_2023,
          companyObj.CA1_2023,
          companyObj.resultat1_2023,
          companyObj.dateClotureExercice2_2023,
          companyObj.CA2_2023,
          companyObj.resultat2_2023,
          companyObj.dateClotureExercice3_2023,
          companyObj.CA3_2023,
          companyObj.resultat3_2023,
          companyObj.secteurActivite,
          companyObj.phone,
          companyObj.website,
          companyObj.reviews,
          companyObj.schedule,
          companyObj.instagram,
          companyObj.facebook,
          companyObj.twitter,
          companyObj.linkedin,
          companyObj.youtube,
          companyObj.email,
          companyObj.dateOfScrapping
        )
    );
  } else {
    console.log("Invalid Company data format");
    return null;
  }
}
