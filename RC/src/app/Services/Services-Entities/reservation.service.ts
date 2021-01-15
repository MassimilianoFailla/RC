import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Reservations } from "src/app/Entities/reservation/Reservations";
import { listaPrenotazioni } from "src/app/Mock/mock-reservations";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  reservations: Reservations[] = listaPrenotazioni;

    constructor() { }

    getReservations(): Observable<Reservations[]> {
        return of(listaPrenotazioni);
    }

    onGet(){
      return this.reservations;
    }

    onGetReservations(id: Number){
      return this.reservations.find(x=>x.id === id);
    }

    onAdd(reservationsList: Reservations){
      this.reservations.push(reservationsList);
    }

    onDelete(id: Number){
      alert('stai cancellando')
      let reservationsList = this.reservations.find(x=>x.id === id);
      let index = this.reservations.indexOf(reservationsList, 0);
      this.reservations.splice(index, 1);
    }

    onUpdate(reservationsList: Reservations){
      // alert('sei su modifica');
      let oldUsers = this.reservations.find(x=>x.id === reservationsList.id);
      oldUsers.dataInizio = reservationsList.dataInizio;
      oldUsers.dataFine = reservationsList.dataFine;
      
    }
  }
