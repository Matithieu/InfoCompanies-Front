import ChiffreAffaire from "./chiffreAffaire";

export enum CheckedStatus {
    NotDone = "NOT_DONE",
    Done = "DONE",
    ToDo = "TO_DO",
    // Ajoutez d'autres statuts si nécessaire
}

/**
 * Company class is the main class of the application.
 * It contains all the information about a company like 
 * its name, its address, its leaders, etc.
 */
// Company.ts

export default class Company {
    private id: number;
    private denomination: string;
    private siren: string;
    private nic: string;
    private formeJuridique: string;
    private codeAPE: string;
    private adresse: string;
    private codePostal: string;
    private ville: string;
    private region: string;
    private dateImmatriculation: string;
    private dateRadiation: string;
    private checked: CheckedStatus;

    // 2019
    private dateClotureExercice1_2019: string;
    private CA1_2019: number;
    private resultat1_2019: number;
    private dateClotureExercice2_2019: string;
    private CA2_2019: number;
    private resultat2_2019: number;
    private dateClotureExercice3_2019: string;
    private CA3_2019: number;
    private resultat3_2019: number;

    // 2020
    private dateClotureExercice1_2020: string;
    private CA1_2020: number;
    private resultat1_2020: number;
    private dateClotureExercice2_2020: string;
    private CA2_2020: number;
    private resultat2_2020: number;
    private dateClotureExercice3_2020: string;
    private CA3_2020: number;
    private resultat3_2020: number;

    // 2021
    private dateClotureExercice1_2021: string;
    private CA1_2021: number;
    private resultat1_2021: number;
    private dateClotureExercice2_2021: string;
    private CA2_2021: number;
    private resultat2_2021: number;
    private dateClotureExercice3_2021: string;
    private CA3_2021: number;
    private resultat3_2021: number;

    // 2022
    private dateClotureExercice1_2022: string;
    private CA1_2022: number;
    private resultat1_2022: number;
    private dateClotureExercice2_2022: string;
    private CA2_2022: number;
    private resultat2_2022: number;
    private dateClotureExercice3_2022: string;
    private CA3_2022: number;
    private resultat3_2022: number;

    // 2023
    private dateClotureExercice1_2023: string;
    private CA1_2023: number;
    private resultat1_2023: number;
    private dateClotureExercice2_2023: string;
    private CA2_2023: number;
    private resultat2_2023: number;
    private dateClotureExercice3_2023: string;
    private CA3_2023: number;
    private resultat3_2023: number;

    // Additional fields
    private dateClotureExercice1: string;
    private CA1: number;
    private resultat1: number;
    private dateClotureExercice2: string;
    private CA2: number;
    private resultat2: number;
    private dateClotureExercice3: string;
    private CA3: number;
    private resultat3: number;

    private secteurActivite: string;
    private phone: string;
    private website: string;
    private reviews: string;
    private schedule: string;
    private instagram: string;
    private facebook: string;
    private twitter: string;
    private linkedin: string;
    private youtube: string;
    private email: string;
    private dateOfScrapping: string;

    constructor(
        id: number,
        denomination: string,
        siren: string,
        nic: string,
        formeJuridique: string,
        codeAPE: string,
        adresse: string,
        codePostal: string,
        ville: string,
        region: string,
        dateImmatriculation: string,
        dateRadiation: string,
        checked: CheckedStatus,
        // 2019
        dateClotureExercice1_2019: string,
        CA1_2019: number,
        resultat1_2019: number,
        dateClotureExercice2_2019: string,
        CA2_2019: number,
        resultat2_2019: number,
        dateClotureExercice3_2019: string,
        CA3_2019: number,
        resultat3_2019: number,
        // 2020
        dateClotureExercice1_2020: string,
        CA1_2020: number,
        resultat1_2020: number,
        dateClotureExercice2_2020: string,
        CA2_2020: number,
        resultat2_2020: number,
        dateClotureExercice3_2020: string,
        CA3_2020: number,
        resultat3_2020: number,
        // 2021
        dateClotureExercice1_2021: string,
        CA1_2021: number,
        resultat1_2021: number,
        dateClotureExercice2_2021: string,
        CA2_2021: number,
        resultat2_2021: number,
        dateClotureExercice3_2021: string,
        CA3_2021: number,
        resultat3_2021: number,
        // 2022
        dateClotureExercice1_2022: string,
        CA1_2022: number,
        resultat1_2022: number,
        dateClotureExercice2_2022: string,
        CA2_2022: number,
        resultat2_2022: number,
        dateClotureExercice3_2022: string,
        CA3_2022: number,
        resultat3_2022: number,
        // 2023
        dateClotureExercice1_2023: string,
        CA1_2023: number,
        resultat1_2023: number,
        dateClotureExercice2_2023: string,
        CA2_2023: number,
        resultat2_2023: number,
        dateClotureExercice3_2023: string,
        CA3_2023: number,
        resultat3_2023: number,
        // Additional fields
        dateClotureExercice1: string,
        CA1: number,
        resultat1: number,
        dateClotureExercice2: string,
        CA2: number,
        resultat2: number,
        dateClotureExercice3: string,
        CA3: number,
        resultat3: number,
        secteurActivite: string,
        phone: string,
        website: string,
        reviews: string,
        schedule: string,
        instagram: string,
        facebook: string,
        twitter: string,
        linkedin: string,
        youtube: string,
        email: string,
        dateOfScrapping: string
    ) {
        // Assign values to private properties
        this.id = id;
        this.denomination = denomination;
        this.siren = siren;
        this.nic = nic;
        this.formeJuridique = formeJuridique;
        this.codeAPE = codeAPE;
        this.adresse = adresse;
        this.codePostal = codePostal;
        this.ville = ville;
        this.region = region;
        this.dateImmatriculation = dateImmatriculation;
        this.dateRadiation = dateRadiation;
        this.checked = checked;
    
        // 2019
        this.dateClotureExercice1_2019 = dateClotureExercice1_2019;
        this.CA1_2019 = CA1_2019;
        this.resultat1_2019 = resultat1_2019;
        this.dateClotureExercice2_2019 = dateClotureExercice2_2019;
        this.CA2_2019 = CA2_2019;
        this.resultat2_2019 = resultat2_2019;
        this.dateClotureExercice3_2019 = dateClotureExercice3_2019;
        this.CA3_2019 = CA3_2019;
        this.resultat3_2019 = resultat3_2019;
    
        // 2020
        this.dateClotureExercice1_2020 = dateClotureExercice1_2020;
        this.CA1_2020 = CA1_2020;
        this.resultat1_2020 = resultat1_2020;
        this.dateClotureExercice2_2020 = dateClotureExercice2_2020;
        this.CA2_2020 = CA2_2020;
        this.resultat2_2020 = resultat2_2020;
        this.dateClotureExercice3_2020 = dateClotureExercice3_2020;
        this.CA3_2020 = CA3_2020;
        this.resultat3_2020 = resultat3_2020;
    
        // 2021
        this.dateClotureExercice1_2021 = dateClotureExercice1_2021;
        this.CA1_2021 = CA1_2021;
        this.resultat1_2021 = resultat1_2021;
        this.dateClotureExercice2_2021 = dateClotureExercice2_2021;
        this.CA2_2021 = CA2_2021;
        this.resultat2_2021 = resultat2_2021;
        this.dateClotureExercice3_2021 = dateClotureExercice3_2021;
        this.CA3_2021 = CA3_2021;
        this.resultat3_2021 = resultat3_2021;
    
        // 2022
        this.dateClotureExercice1_2022 = dateClotureExercice1_2022;
        this.CA1_2022 = CA1_2022;
        this.resultat1_2022 = resultat1_2022;
        this.dateClotureExercice2_2022 = dateClotureExercice2_2022;
        this.CA2_2022 = CA2_2022;
        this.resultat2_2022 = resultat2_2022;
        this.dateClotureExercice3_2022 = dateClotureExercice3_2022;
        this.CA3_2022 = CA3_2022;
        this.resultat3_2022 = resultat3_2022;
    
        // 2023
        this.dateClotureExercice1_2023 = dateClotureExercice1_2023;
        this.CA1_2023 = CA1_2023;
        this.resultat1_2023 = resultat1_2023;
        this.dateClotureExercice2_2023 = dateClotureExercice2_2023;
        this.CA2_2023 = CA2_2023;
        this.resultat2_2023 = resultat2_2023;
        this.dateClotureExercice3_2023 = dateClotureExercice3_2023;
        this.CA3_2023 = CA3_2023;
        this.resultat3_2023 = resultat3_2023;
    
        // Additional fields
        this.dateClotureExercice1 = dateClotureExercice1;
        this.CA1 = CA1;
        this.resultat1 = resultat1;
        this.dateClotureExercice2 = dateClotureExercice2;
        this.CA2 = CA2;
        this.resultat2 = resultat2;
        this.dateClotureExercice3 = dateClotureExercice3;
        this.CA3 = CA3;
        this.resultat3 = resultat3;
    
        this.secteurActivite = secteurActivite;
        this.phone = phone;
        this.website = website;
        this.reviews = reviews;
        this.schedule = schedule;
        this.instagram = instagram;
        this.facebook = facebook;
        this.twitter = twitter;
        this.linkedin = linkedin;
        this.youtube = youtube;
        this.email = email;
        this.dateOfScrapping = dateOfScrapping;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getDenomination(): string {
        return this.denomination;
    }

    public setDenomination(denomination: string): void {
        this.denomination = denomination;
    }

    public getSiren(): string {
        return this.siren;
    }

    public setSiren(siren: string): void {
        this.siren = siren;
    }

    public getNic(): string {
        return this.nic;
    }

    public setNic(nic: string): void {
        this.nic = nic;
    }

    public getFormeJuridique(): string {
        return this.formeJuridique;
    }

    public setFormeJuridique(formeJuridique: string): void {
        this.formeJuridique = formeJuridique;
    }

    public getCodeAPE(): string {
        return this.codeAPE;
    }

    public setCodeAPE(codeAPE: string): void {
        this.codeAPE = codeAPE;
    }

    public getAdresse(): string {
        return this.adresse;
    }

    public setAdresse(adresse: string): void {
        this.adresse = adresse;
    }

    public getCodePostal(): string {
        return this.codePostal;
    }

    public setCodePostal(codePostal: string): void {
        this.codePostal = codePostal;
    }

    public getVille(): string {
        return this.ville;
    }

    public setVille(ville: string): void {
        this.ville = ville;
    }

    public getRegion(): string {
        return this.region;
    }

    public setRegion(region: string): void {
        this.region = region;
    }

    public getDateImmatriculation(): string {
        return this.dateImmatriculation;
    }

    public setDateImmatriculation(dateImmatriculation: string): void {
        this.dateImmatriculation = dateImmatriculation;
    }

    public getDateRadiation(): string {
        return this.dateRadiation;
    }

    public setDateRadiation(dateRadiation: string): void {
        this.dateRadiation = dateRadiation;
    }

    public getChecked(): CheckedStatus {
        return this.checked;
    }

    public setChecked(checked: CheckedStatus): void {
        this.checked = checked;
    }

    public getDateClotureExercice1_2019(): string {
        return this.dateClotureExercice1_2019;
    }

    public setDateClotureExercice1_2019(dateClotureExercice1_2019: string): void {
        this.dateClotureExercice1_2019 = dateClotureExercice1_2019;
    }

    public getCA1_2019(): number {
        return this.CA1_2019;
    }

    public setCA1_2019(CA1_2019: number): void {
        this.CA1_2019 = CA1_2019;
    }

    public getResultat1_2019(): number {
        return this.resultat1_2019;
    }

    public setResultat1_2019(resultat1_2019: number): void {
        this.resultat1_2019 = resultat1_2019;
    }

    public getDateClotureExercice2_2019(): string {
        return this.dateClotureExercice2_2019;
    }

    public setDateClotureExercice2_2019(dateClotureExercice2_2019: string): void {
        this.dateClotureExercice2_2019 = dateClotureExercice2_2019;
    }

    public getCA2_2019(): number {
        return this.CA2_2019;
    }

    public setCA2_2019(CA2_2019: number): void {
        this.CA2_2019 = CA2_2019;
    }

    public getResultat2_2019(): number {
        return this.resultat2_2019;
    }

    public setResultat2_2019(resultat2_2019: number): void {
        this.resultat2_2019 = resultat2_2019;
    }

    public getDateClotureExercice3_2019(): string {
        return this.dateClotureExercice3_2019;
    }

    public setDateClotureExercice3_2019(dateClotureExercice3_2019: string): void {
        this.dateClotureExercice3_2019 = dateClotureExercice3_2019;
    }

    public getCA3_2019(): number {
        return this.CA3_2019;
    }

    public setCA3_2019(CA3_2019: number): void {
        this.CA3_2019 = CA3_2019;
    }

    public getResultat3_2019(): number {
        return this.resultat3_2019;
    }

    public setResultat3_2019(resultat3_2019: number): void {
        this.resultat3_2019 = resultat3_2019;
    }

    public getDateClotureExercice1_2020(): string {
        return this.dateClotureExercice1_2020;
    }

    public setDateClotureExercice1_2020(dateClotureExercice1_2020: string): void {
        this.dateClotureExercice1_2020 = dateClotureExercice1_2020;
    }

    public getCA1_2020(): number {
        return this.CA1_2020;
    }

    public setCA1_2020(CA1_2020: number): void {
        this.CA1_2020 = CA1_2020;
    }

    public getResultat1_2020(): number {
        return this.resultat1_2020;
    }

    public setResultat1_2020(resultat1_2020: number): void {
        this.resultat1_2020 = resultat1_2020;
    }

    public getDateClotureExercice2_2020(): string {
        return this.dateClotureExercice2_2020;
    }

    public setDateClotureExercice2_2020(dateClotureExercice2_2020: string): void {
        this.dateClotureExercice2_2020 = dateClotureExercice2_2020;
    }

    public getCA2_2020(): number {
        return this.CA2_2020;
    }

    public setCA2_2020(CA2_2020: number): void {
        this.CA2_2020 = CA2_2020;
    }

    public getResultat2_2020(): number {
        return this.resultat2_2020;
    }

    public setResultat2_2020(resultat2_2020: number): void {
        this.resultat2_2020 = resultat2_2020;
    }

    public getDateClotureExercice3_2020(): string {
        return this.dateClotureExercice3_2020;
    }

    public setDateClotureExercice3_2020(dateClotureExercice3_2020: string): void {
        this.dateClotureExercice3_2020 = dateClotureExercice3_2020;
    }

    public getCA3_2020(): number {
        return this.CA3_2020;
    }

    public setCA3_2020(CA3_2020: number): void {
        this.CA3_2020 = CA3_2020;
    }

    public getResultat3_2020(): number {
        return this.resultat3_2020;
    }

    public setResultat3_2020(resultat3_2020: number): void {
        this.resultat3_2020 = resultat3_2020;
    }

    public getDateClotureExercice1_2021(): string {
        return this.dateClotureExercice1_2021;
    }

    public setDateClotureExercice1_2021(dateClotureExercice1_2021: string): void {
        this.dateClotureExercice1_2021 = dateClotureExercice1_2021;
    }

    public getCA1_2021(): number {
        return this.CA1_2021;
    }

    public setCA1_2021(CA1_2021: number): void {
        this.CA1_2021 = CA1_2021;
    }

    public getResultat1_2021(): number {
        return this.resultat1_2021;
    }

    public setResultat1_2021(resultat1_2021: number): void {
        this.resultat1_2021 = resultat1_2021;
    }

    public getDateClotureExercice2_2021(): string {
        return this.dateClotureExercice2_2021;
    }

    public setDateClotureExercice2_2021(dateClotureExercice2_2021: string): void {
        this.dateClotureExercice2_2021 = dateClotureExercice2_2021;
    }

    public getCA2_2021(): number {
        return this.CA2_2021;
    }

    public setCA2_2021(CA2_2021: number): void {
        this.CA2_2021 = CA2_2021;
    }

    public getResultat2_2021(): number {
        return this.resultat2_2021;
    }

    public setResultat2_2021(resultat2_2021: number): void {
        this.resultat2_2021 = resultat2_2021;
    }

    public getDateClotureExercice3_2021(): string {
        return this.dateClotureExercice3_2021;
    }

    public setDateClotureExercice3_2021(dateClotureExercice3_2021: string): void {
        this.dateClotureExercice3_2021 = dateClotureExercice3_2021;
    }

    public getCA3_2021(): number {
        return this.CA3_2021;
    }

    public setCA3_2021(CA3_2021: number): void {
        this.CA3_2021 = CA3_2021;
    }

    public getResultat3_2021(): number {
        return this.resultat3_2021;
    }

    public setResultat3_2021(resultat3_2021: number): void {
        this.resultat3_2021 = resultat3_2021;
    }

    public getDateClotureExercice1_2022(): string {
        return this.dateClotureExercice1_2022;
    }

    public setDateClotureExercice1_2022(dateClotureExercice1_2022: string): void {
        this.dateClotureExercice1_2022 = dateClotureExercice1_2022;
    }

    public getCA1_2022(): number {
        return this.CA1_2022;
    }

    public setCA1_2022(CA1_2022: number): void {
        this.CA1_2022 = CA1_2022;
    }

    public getResultat1_2022(): number {
        return this.resultat1_2022;
    }

    public setResultat1_2022(resultat1_2022: number): void {
        this.resultat1_2022 = resultat1_2022;
    }

    public getDateClotureExercice2_2022(): string {
        return this.dateClotureExercice2_2022;
    }

    public setDateClotureExercice2_2022(dateClotureExercice2_2022: string): void {
        this.dateClotureExercice2_2022 = dateClotureExercice2_2022;
    }

    public getCA2_2022(): number {
        return this.CA2_2022;
    }

    public setCA2_2022(CA2_2022: number): void {
        this.CA2_2022 = CA2_2022;
    }

    public getResultat2_2022(): number {
        return this.resultat2_2022;
    }

    public setResultat2_2022(resultat2_2022: number): void {
        this.resultat2_2022 = resultat2_2022;
    }

    public getDateClotureExercice3_2022(): string {
        return this.dateClotureExercice3_2022;
    }

    public setDateClotureExercice3_2022(dateClotureExercice3_2022: string): void {
        this.dateClotureExercice3_2022 = dateClotureExercice3_2022;
    }

    public getCA3_2022(): number {
        return this.CA3_2022;
    }

    public setCA3_2022(CA3_2022: number): void {
        this.CA3_2022 = CA3_2022;
    }

    public getResultat3_2022(): number {
        return this.resultat3_2022;
    }

    public setResultat3_2022(resultat3_2022: number): void {
        this.resultat3_2022 = resultat3_2022;
    }

    public getDateClotureExercice1_2023(): string {
        return this.dateClotureExercice1_2023;
    }

    public setDateClotureExercice1_2023(dateClotureExercice1_2023: string): void {
        this.dateClotureExercice1_2023 = dateClotureExercice1_2023;
    }

    public getCA1_2023(): number {
        return this.CA1_2023;
    }

    public setCA1_2023(CA1_2023: number): void {
        this.CA1_2023 = CA1_2023;
    }

    public getResultat1_2023(): number {
        return this.resultat1_2023;
    }

    public setResultat1_2023(resultat1_2023: number): void {
        this.resultat1_2023 = resultat1_2023;
    }

    public getDateClotureExercice2_2023(): string {
        return this.dateClotureExercice2_2023;
    }

    public setDateClotureExercice2_2023(dateClotureExercice2_2023: string): void {
        this.dateClotureExercice2_2023 = dateClotureExercice2_2023;
    }

    public getCA2_2023(): number {
        return this.CA2_2023;
    }

    public setCA2_2023(CA2_2023: number): void {
        this.CA2_2023 = CA2_2023;
    }

    public getResultat2_2023(): number {
        return this.resultat2_2023;
    }

    public setResultat2_2023(resultat2_2023: number): void {
        this.resultat2_2023 = resultat2_2023;
    }

    public getDateClotureExercice3_2023(): string {
        return this.dateClotureExercice3_2023;
    }

    public setDateClotureExercice3_2023(dateClotureExercice3_2023: string): void {
        this.dateClotureExercice3_2023 = dateClotureExercice3_2023;
    }

    public getCA3_2023(): number {
        return this.CA3_2023;
    }

    public setCA3_2023(CA3_2023: number): void {
        this.CA3_2023 = CA3_2023;
    }

    public getResultat3_2023(): number {
        return this.resultat3_2023;
    }

    public setResultat3_2023(resultat3_2023: number): void {
        this.resultat3_2023 = resultat3_2023;
    }

    public getDateClotureExercice1(): string {
        return this.dateClotureExercice1;
    }

    public setDateClotureExercice1(dateClotureExercice1: string): void {
        this.dateClotureExercice1 = dateClotureExercice1;
    }

    public getCA1(): number {
        return this.CA1;
    }

    public setCA1(CA1: number): void {
        this.CA1 = CA1;
    }

    public getResultat1(): number {
        return this.resultat1;
    }

    public setResultat1(resultat1: number): void {
        this.resultat1 = resultat1;
    }

    public getDateClotureExercice2(): string {
        return this.dateClotureExercice2;
    }

    public setDateClotureExercice2(dateClotureExercice2: string): void {
        this.dateClotureExercice2 = dateClotureExercice2;
    }

    public getCA2(): number {
        return this.CA2;
    }

    public setCA2(CA2: number): void {
        this.CA2 = CA2;
    }

    public getResultat2(): number {
        return this.resultat2;
    }

    public setResultat2(resultat2: number): void {
        this.resultat2 = resultat2;
    }

    public getDateClotureExercice3(): string {
        return this.dateClotureExercice3;
    }

    public setDateClotureExercice3(dateClotureExercice3: string): void {
        this.dateClotureExercice3 = dateClotureExercice3;
    }

    public getCA3(): number {
        return this.CA3;
    }

    public setCA3(CA3: number): void {
        this.CA3 = CA3;
    }

    public getResultat3(): number {
        return this.resultat3;
    }

    public setResultat3(resultat3: number): void {
        this.resultat3 = resultat3;
    }

    public getSecteurActivite(): string {
        return this.secteurActivite;
    }

    public setSecteurActivite(secteurActivite: string): void {
        this.secteurActivite = secteurActivite;
    }

    public getPhone(): string {
        return this.phone;
    }

    public setPhone(phone: string): void {
        this.phone = phone;
    }

    public getWebsite(): string {
        return this.website;
    }

    public setWebsite(website: string): void {
        this.website = website;
    }

    public getReviews(): string {
        return this.reviews;
    }

    public setReviews(reviews: string): void {
        this.reviews = reviews;
    }

    public getSchedule(): string {
        return this.schedule;
    }

    public setSchedule(schedule: string): void {
        this.schedule = schedule;
    }

    public getInstagram(): string {
        return this.instagram;
    }

    public setInstagram(instagram: string): void {
        this.instagram = instagram;
    }

    public getFacebook(): string {
        return this.facebook;
    }

    public setFacebook(facebook: string): void {
        this.facebook = facebook;
    }

    public getTwitter(): string {
        return this.twitter;
    }

    public setTwitter(twitter: string): void {
        this.twitter = twitter;
    }

    public getLinkedin(): string {
        return this.linkedin;
    }

    public setLinkedin(linkedin: string): void {
        this.linkedin = linkedin;
    }

    public getYoutube(): string {
        return this.youtube;
    }

    public setYoutube(youtube: string): void {
        this.youtube = youtube;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getDateOfScrapping(): string {
        return this.dateOfScrapping;
    }

    public setDateOfScrapping(dateOfScrapping: string): void {
        this.dateOfScrapping = dateOfScrapping;
    }


    public getCAByYear(year: number): number {
        switch (year) {
            case 2019:
                return this.CA1_2019 + this.CA2_2019 + this.CA3_2019;
            case 2020:
                return this.CA1_2020 + this.CA2_2020 + this.CA3_2020;
            case 2021:
                return this.CA1_2021 + this.CA2_2021 + this.CA3_2021;
            case 2022:
                return this.CA1_2022 + this.CA2_2022 + this.CA3_2022;
            case 2023:
                return this.CA1_2023 + this.CA2_2023 + this.CA3_2023;
            default:
                return this.CA1 + this.CA2 + this.CA3;
        }
    }

    public getResultatByYear(year: number): number {
        switch (year) {
            case 2019:
                return this.resultat1_2019 + this.resultat2_2019 + this.resultat3_2019;
            case 2020:
                return this.resultat1_2020 + this.resultat2_2020 + this.resultat3_2020;
            case 2021:
                return this.resultat1_2021 + this.resultat2_2021 + this.resultat3_2021;
            case 2022:
                return this.resultat1_2022 + this.resultat2_2022 + this.resultat3_2022;
            case 2023:
                return this.resultat1_2023 + this.resultat2_2023 + this.resultat3_2023;
            default:
                return this.resultat1 + this.resultat2 + this.resultat3;
        }
    }

    getAdresseTotal() {
        return new ChiffreAffaire([
            "2019",
            "2020",
            "2021",
            "2022",
            "2023",
            "En cours"
        ],
        [
            this.CA1_2019 + this.CA2_2019 + this.CA3_2019,
            this.CA1_2020 + this.CA2_2020 + this.CA3_2020,
            this.CA1_2021 + this.CA2_2021 + this.CA3_2021,
            this.CA1_2022 + this.CA2_2022 + this.CA3_2022,
            this.CA1_2023 + this.CA2_2023 + this.CA3_2023,
            this.CA1 + this.CA2 + this.CA3
        ],
        )
    }
}