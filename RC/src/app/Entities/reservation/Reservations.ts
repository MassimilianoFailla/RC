import { Users } from "../user/Users";
import { Vehicles } from "../vehicle/Vehicles";

export class Reservations {

    id: number;
    dataInizio: Date;
    dataFine: Date;
    utente: Users;
    veicolo: Vehicles;
    approvazione: boolean;

    // constructor(id: number, dataInizio: Date, dataFine: Date, idUser: number, targaVehicle: string, approvazione: boolean) {
    //     this.id = id;
    //     this.dataInizio = dataInizio;
    //     this.dataFine = dataFine;
    //     this.idUser = idUser;

    // }
}