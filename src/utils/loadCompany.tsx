import ChiffreAffaire from "../data/chiffreDaffaire";
import Company from "../data/company";
import Leader from "../data/leader";

export function loadCompanyFromLocalStorage(key : any) {
    const companyData = localStorage.getItem(key);
    if (!companyData) {
        return null;
    }

    const companyObjs : any[] = JSON.parse(companyData);
    return companyObjs.map(companyObj => new Company(
        companyObj.favoris,
        companyObj.checked,
        companyObj.denomination,
        companyObj.siren,
        companyObj.nic,
        companyObj.forme_juridique,
        companyObj.code_ape,
        companyObj.secteur_d_activite,
        companyObj.adresse,
        companyObj.code_postal,
        companyObj.ville,
        companyObj.num_dept,
        companyObj.departement,
        companyObj.region,
        companyObj.code_greffe,
        companyObj.greffe,
        companyObj.date_immatriculation,
        companyObj.date_radiation,
        companyObj.statut,
        companyObj.geolocalisation,
        companyObj.phone,
        companyObj.email,
        companyObj.website,
        companyObj.youtube,
        companyObj.facebook,
        companyObj.twitter,
        companyObj.linkedin,
        companyObj.address,
        companyObj.creationDate,
        new ChiffreAffaire(
            companyObj.chiffreAffaire.date,
            companyObj.chiffreAffaire.chiffreAffaire
        ),
        companyObj.leaders.map(leaderData => new Leader(
            leaderData.id,
            leaderData.prenom,
            leaderData.nom,
            leaderData.dateNaissance,
            leaderData.phone,
            leaderData.email,
            leaderData.listOfCompanies.map(listOfCompanies => ({
                favoris: listOfCompanies.favoris,
                denomination: listOfCompanies.denomination,
            }))
        ))
    ));
}