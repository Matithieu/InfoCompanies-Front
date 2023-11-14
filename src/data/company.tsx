export default class CompanyData {
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
    phone: string;
    email: string;
    website: string;
    youtube: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    address: string;
    creationDate: string;
    chiffreAffaire: {
        date: string[],
        chiffreAffaire: string[],
    }
    leaders: {
        nom: string[],
        dateNaissance: string[],
    }
}