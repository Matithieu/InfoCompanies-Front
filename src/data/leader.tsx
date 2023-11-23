export default class Leader {
    id: number;
    nom: string;
    prenom: string;
    dateNaissance: Date;
    phone: string;
    email: string;
    listOfCompanies: {
        id: number;
        denomination: string;
    }[];
    

    constructor(id: number, nom: string, prenom: string, dateNaissance: Date, telephone: string, email: string, listOfCompanies: { id: number; denomination: string; }[]) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.dateNaissance = dateNaissance;
        this.phone = telephone;
        this.email = email;
        this.listOfCompanies = listOfCompanies;
    }

    public getId(): number {
        return this.id;
    }

    public getNom(): string {
        return this.nom;
    }

    public getPrenom(): string {
        return this.prenom;
    }
    
    public getDateNaissance(): Date {
        return this.dateNaissance;
    }

    public getPhone(): string {
        return this.phone;
    }

    public getEmail(): string {
        return this.email;
    }

    public getListOfCompanies(): { id: number; denomination: string; }[] {
        return this.listOfCompanies;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setNom(nom: string): void {
        this.nom = nom;
    }

    public setPrenom(prenom: string): void {
        this.prenom = prenom;
    }

    public setDateNaissance(dateNaissance: Date): void {
        this.dateNaissance = dateNaissance;
    }

    public setPhone(phone: string): void {
        this.phone = phone;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setListOfCompanies(listOfCompanies: { id: number; denomination: string; }[]): void {
        this.listOfCompanies = listOfCompanies;
    }
}