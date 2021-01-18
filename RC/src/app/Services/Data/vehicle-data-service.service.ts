import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiMsg } from 'src/app/Entities/user/user.component';
import { Vehicles } from 'src/app/Entities/vehicle/Vehicles';

@Injectable({
  providedIn: 'root'
})
export class VehicleDataService {

  // servono per il collegamento
  server = "localhost";
  port = "5051";
  port2 = "4000";

  constructor(private httpClient:HttpClient) { }

  getVehicles(){
  return this.httpClient.get<Vehicles>(`http://localhost:4000/api/vehicles/views`);
  }

  insVehicle(vehicle: Vehicles) {
    return this.httpClient.post<ApiMsg>(`http://${this.server}:${this.port2}/api/vehicles/inserisci`, vehicle);
  }
  
  updVehicle(vehicle: Vehicles) {
    return this.httpClient.put<ApiMsg>(`http://${this.server}:${this.port2}/api/vehicles/modifica/`, vehicle);
  }

  getVehicleById(id: number){
    return this.httpClient.get<Vehicles>(`http://${this.server}:${this.port2}/api/vehicles/vehicles/${id}`);
  }

  delVehicleById(id: number) {
    return this.httpClient.delete<ApiMsg>(`http://${this.server}:${this.port2}/api/vehicles/elimina/${id}`);
  }

}