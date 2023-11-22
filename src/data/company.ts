import ChiffreAffaire from "./chiffreDaffaire";
import Leader from "./leader";

export default class Company {

    private favoris: boolean;
    private denomination: string;
    private siren: string;
    private nic: string;
    private forme_juridique: string;
    private code_ape: string;
    private secteur_d_activite: string;
    private adresse: string;
    private code_postal: string;
    private ville: string;
    private num_dept: string;
    private departement: string;
    private region: string;
    private code_greffe: string;
    private greffe: string;
    private date_immatriculation: string;
    private date_radiation: string | null;
    private statut: string;
    private geolocalisation: {
        lon: number;
        lat: number;
    };
    private phone: string;
    private email: string;
    private website: string;
    private youtube: string;
    private facebook: string;
    private twitter: string;
    private linkedin: string;
    private address: string;
    private creationDate: string;
    private chiffreAffaire: ChiffreAffaire
    private leaders: Leader

    constructor(
        favoris: boolean,
        denomination: string,
        siren: string,
        nic: string,
        forme_juridique: string,
        code_ape: string,
        secteur_d_activite: string,
        adresse: string,
        code_postal: string,
        ville: string,
        num_dept: string,
        departement: string,
        region: string,
        code_greffe: string,
        greffe: string,
        date_immatriculation: string,
        date_radiation: string | null,
        statut: string,
        geolocalisation: {
            lon: number;
            lat: number;
        },
        phone: string,
        email: string,
        website: string,
        youtube: string,
        facebook: string,
        twitter: string,
        linkedin: string,
        address: string,
        creationDate: string,
        chiffreAffaire: ChiffreAffaire,
        leaders: Leader
    ) {
        this.favoris = favoris;
        this.denomination = denomination;
        this.siren = siren;
        this.nic = nic;
        this.forme_juridique = forme_juridique;
        this.code_ape = code_ape;
        this.secteur_d_activite = secteur_d_activite;
        this.adresse = adresse;
        this.code_postal = code_postal;
        this.ville = ville;
        this.num_dept = num_dept;
        this.departement = departement;
        this.region = region;
        this.code_greffe = code_greffe;
        this.greffe = greffe;
        this.date_immatriculation;
        this.date_radiation = date_radiation;
        this.statut = statut;
        this.geolocalisation = geolocalisation;
        this.phone = phone;
        this.email = email;
        this.website = website;
        this.youtube = youtube;
        this.facebook = facebook;
        this.twitter = twitter;
        this.linkedin = linkedin;
        this.address = address;
        this.creationDate = creationDate;
        this.chiffreAffaire = chiffreAffaire;
        this.leaders = leaders;
    }

    getFavoris(): boolean {
        return this.favoris;
    }

    setFavoris(value: boolean) {
        this.favoris = value;
    }

    getDenomination(): string {
        return this.denomination;
    }

    setDenomination(value: string) {
        this.denomination = value;
    }

    getSiren(): string {
        return this.siren;
    }

    setSiren(value: string) {
        this.siren = value;
    }

    getNic(): string {
        return this.nic;
    }

    setNic(value: string) {
        this.nic = value;
    }

    getFormeJuridique(): string {
        return this.forme_juridique;
    }

    setFormeJuridique(value: string) {
        this.forme_juridique = value;
    }

    getCodeApe(): string {
        return this.code_ape;
    }

    setCodeApe(value: string) {
        this.code_ape = value;
    }

    getSecteurDActivite(): string {
        return this.secteur_d_activite;
    }

    setSecteurDActivite(value: string) {
        this.secteur_d_activite = value;
    }

    getAdresse(): string {
        return this.adresse;
    }

    setAdresse(value: string) {
        this.adresse = value;
    }

    getCodePostal(): string {
        return this.code_postal;
    }

    setCodePostal(value: string) {
        this.code_postal = value;
    }

    getVille(): string {
        return this.ville;
    }

    setVille(value: string) {
        this.ville = value;
    }

    getNumDept(): string {
        return this.num_dept;
    }

    setNumDept(value: string) {
        this.num_dept = value;
    }

    getDepartement(): string {
        return this.departement;
    }

    setDepartement(value: string) {
        this.departement = value;
    }

    getRegion(): string {
        return this.region;
    }

    setRegion(value: string) {
        this.region = value;
    }

    getCodeGreffe(): string {
        return this.code_greffe;
    }

    setCodeGreffe(value: string) {
        this.code_greffe = value;
    }

    getGreffe(): string {
        return this.greffe;
    }

    setGreffe(value: string) {
        this.greffe = value;
    }

    getDateImmatriculation(): string {
        return this.date_immatriculation;
    }

    setDateImmatriculation(value: string) {
        this.date_immatriculation = value;
    }

    getDateRadiation(): string | null {
        return this.date_radiation;
    }

    setDateRadiation(value: string | null) {
        this.date_radiation = value;
    }

    getStatut(): string {
        return this.statut;
    }

    setStatut(value: string) {
        this.statut = value;
    }

    getGeolocalisation(): { lon: number; lat: number } {
        return this.geolocalisation;
    }

    setGeolocalisation(value: { lon: number; lat: number }) {
        this.geolocalisation = value;
    }

    getPhone(): string {
        return this.phone;
    }

    setPhone(value: string) {
        this.phone = value;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(value: string) {
        this.email = value;
    }

    getWebsite(): string {
        return this.website;
    }

    setWebsite(value: string) {
        this.website = value;
    }

    getYoutube(): string {
        return this.youtube;
    }

    setYoutube(value: string) {
        this.youtube = value;
    }

    getFacebook(): string {
        return this.facebook;
    }

    setFacebook(value: string) {
        this.facebook = value;
    }

    getTwitter(): string {
        return this.twitter;
    }

    setTwitter(value: string) {
        this.twitter = value;
    }

    getLinkedin(): string {
        return this.linkedin;
    }

    setLinkedin(value: string) {
        this.linkedin = value;
    }

    getAddress(): string {
        return this.address;
    }

    setAddress(value: string) {
        this.address = value;
    }

    getCreationDate(): string {
        return this.creationDate;
    }

    setCreationDate(value: string) {
        this.creationDate = value;
    }

    getChiffreAffaire(): ChiffreAffaire {
        return this.chiffreAffaire;
    }

    setChiffreAffaire(value: ChiffreAffaire) {
        this.chiffreAffaire = value;
    }

    getLeaders(): Leader {
        return this.leaders;
    }

    setLeaders(value: Leader) {
        this.leaders = value;
    }
}