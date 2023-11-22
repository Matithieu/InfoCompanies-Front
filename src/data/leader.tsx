export default class Leader {
    nom: string[];
    dateNaissance: string[];

    constructor(nom: string[], dateNaissance: string[]) {
        this.nom = nom;
        this.dateNaissance = dateNaissance;
    }

    public getNom(): string[] {
        return this.nom;
    }

    public getDateNaissance(): string[] {
        return this.dateNaissance;
    }

    public setNom(nom: string[]): void {
        this.nom = nom;
    }

    public setDateNaissance(dateNaissance: string[]): void {
        this.dateNaissance = dateNaissance;
    }
}