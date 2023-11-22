export default class ChiffreAffaire {
    date: string[];
    chiffreAffaire: string[];

    constructor(date: string[], chiffreAffaire: string[]) {
        this.date = date;
        this.chiffreAffaire = chiffreAffaire;
    }

    public getDate(): string[] {
        return this.date;
    }

    public getChiffreAffaire(): string[] {
        return this.chiffreAffaire;
    }

    public setDate(date: string[]): void {
        this.date = date;
    }

    public setChiffreAffaire(chiffreAffaire: string[]): void {
        this.chiffreAffaire = chiffreAffaire;
    }
}
