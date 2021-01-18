import { Users } from "../user/Users";

export class Reservations {

    id: number
    dataInizio: Date
    dataFine: Date
    idUser: number;
    targa: string;
    approvazione: boolean;

    // constructor(id: number, dataInizio: Date, dataFine: Date, idUser: number, targaVehicle: string, approvazione: boolean) {
    //     this.id = id;
    //     this.dataInizio = dataInizio;
    //     this.dataFine = dataFine;
    //     this.idUser = idUser;

    // }
}
