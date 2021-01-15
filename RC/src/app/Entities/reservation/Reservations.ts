export class Reservations {

    id: number
    dataInizio: string
    dataFine: string

    constructor(id: number, dataInizio: string, dataFine: string) {
        this.id = id;
        this.dataInizio = dataInizio;
        this.dataFine = dataFine

    }
}
