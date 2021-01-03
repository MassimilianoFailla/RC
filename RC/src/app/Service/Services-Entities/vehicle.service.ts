import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Vehicles } from 'src/app/Entities/vehicle/Vehicles';
import { listaVeicoli } from 'src/app/Mock/mock-vehicles';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  vehicles: Vehicles[] = listaVeicoli;

    constructor() { }
    getVehicles(): Observable<Vehicles[]> {
        return of(listaVeicoli);
    }

    onGet(){
      return this.vehicles;
    }

    onGetVehicles(id: Number){
      return this.vehicles.find(x=>x.id === id);
    }

    // add vehicles list
    onAdd(vehiclesList: Vehicles){
      this.vehicles.push(vehiclesList);
    }

    // delete vehicles by id
    onDelete(id: Number){
      let vehiclesList = this.vehicles.find(x=>x.id === id);
      let index = this.vehicles.indexOf(vehiclesList, 0);
      this.vehicles.splice(index, 1);
    }

    // update vehicles
    onUpdate(vehiclesList: Vehicles){
      let oldVehicles = this.vehicles.find(x=>x.id === vehiclesList.id);
      oldVehicles.casaCostruttrice = vehiclesList.casaCostruttrice;
      oldVehicles.annoImmatricolazione = vehiclesList.annoImmatricolazione;
      oldVehicles.modello = vehiclesList.modello;
      oldVehicles.targa = vehiclesList.targa;
    }
  }
