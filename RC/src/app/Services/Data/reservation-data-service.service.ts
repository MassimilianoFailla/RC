import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservations } from 'src/app/Entities/reservation/Reservations';
import { ApiMsg } from 'src/app/Entities/user/user.component';

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

  insReservation(reservation: Reservations) {
    return this.httpClient.post<ApiMsg>(`http://${this.server}:${this.port2}/api/reservations/inserisci`, reservation);
  }
  
  updReservation(reservation: Reservations) {
    return this.httpClient.put<ApiMsg>(`http://${this.server}:${this.port2}/api/reservations/elimina/`, reservation);
  }

  delReservationById(id: number) {
    return this.httpClient.delete<ApiMsg>(`http://${this.server}:${this.port2}/api/reservations/elimina/${id}`);
  }

}