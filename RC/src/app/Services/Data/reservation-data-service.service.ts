import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservations } from 'src/app/Entities/reservation/Reservations';
import { ApiMsg } from 'src/app/Entities/user/user.component';
import { Users } from 'src/app/Entities/user/Users';
import { Vehicles } from 'src/app/Entities/vehicle/Vehicles';
@Injectable({
  providedIn: 'root'
})
export class ReservationDataService {

  // servono per il collegamento
  server = "localhost";
  port = "5051";
  port2 = "4000";
  
  constructor(private httpClient:HttpClient) { }

  getReservations(){
  return this.httpClient.get<Reservations[]>(`http://localhost:4000/api/reservations/views`);
}

  // mi richiamo gli utenti
  getUsers(){
    return this.httpClient.get<Users>(`http://${this.server}:${this.port2}/api/users/views`);
  }

  // mi richiamo i veicoli
  getVehicles(){
    return this.httpClient.get<Vehicles>(`http://localhost:4000/api/vehicles/views`);
    }

    InsReservation(reservation: Reservations) {
    return this.httpClient.post<ApiMsg>(`http://${this.server}:${this.port2}/api/reservations/inserisci`, reservation);
  }

  getReservationsById(id: number){
    return this.httpClient.get<Reservations>(`http://${this.server}:${this.port2}/api/vehicles/vehicles/${id}`);
  }
  
  updReservation(reservation: Reservations) {
    return this.httpClient.put<ApiMsg>(`http://${this.server}:${this.port2}/api/reservations/modifica/`, reservation);
  }

  delReservationById(id: number) {
    return this.httpClient.delete<ApiMsg>(`http://${this.server}:${this.port2}/api/reservations/elimina/${id}`);
  }

}