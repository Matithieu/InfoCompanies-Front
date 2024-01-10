export default class ChiffreAffaire {
    date: string[];
    chiffreAffaire: number[];

    constructor(date: string[], chiffreAffaire: number[]) {
        this.date = date;
        this.chiffreAffaire = chiffreAffaire;
    }

    public getDate(): string[] {
        return this.date;
    }

    public getAdresse(): number[] {
        return this.chiffreAffaire;
    }

    public setDate(date: string[]): void {
        this.date = date;
    }

    public setChiffreAffaire(chiffreAffaire: number[]): void {
        this.chiffreAffaire = chiffreAffaire;
    }
}