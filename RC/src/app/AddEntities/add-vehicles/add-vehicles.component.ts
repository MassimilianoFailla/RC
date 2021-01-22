import { VehicleDataService } from './../../Services/Data/vehicle-data-service.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Vehicles } from 'src/app/Entities/vehicle/Vehicles';
import { ApiMsg } from 'src/app/Entities/user/user.component';

@Component({
  selector: 'app-add-vehicles',
  templateUrl: './add-vehicles.component.html',
  styleUrls: ['./add-vehicles.component.css']
})
export class AddVehiclesComponent implements OnInit {

  errore: string = '';
  isModifica: boolean = false;
  conferma: string = '';
  apiMsg: ApiMsg;
  
  // veicoli
  vehiclesList: Vehicles = {
    id: 0,
    casaCostruttrice: '',
    annoImmatricolazione: new Date(),
    modello: '',
    targa: '',
    tipologia: '',
  }

  constructor(private router: Router, private vehicleDataService: VehicleDataService) { }

  ngOnInit(): void {
  
  }

  abort() {
    alert('stai tornando alla tabella dei veicoli')
    this.router.navigate(['/vehicles']);
  }

  onSubmit(form: NgForm) {

    let vehicles: Vehicles = {
      id: form.value.id,
      annoImmatricolazione: form.value.annoImmatricolazione,
      casaCostruttrice: form.value.casaCostruttrice,
      modello: form.value.modello,
      targa: form.value.targa,
      tipologia: form.value.tipologia,
    }
    
    this.vehicleDataService.insVehicle(vehicles).subscribe(
      response => {
        console.log(response);
        this.apiMsg = response;
        this.conferma = this.apiMsg.message;
        console.log(this.conferma);
      },
      error => {
        this.errore = error.error.messaggio;
        console.log(this.errore);
      }
    )
    alert("Nuovo veicolo salvato con successo!");
   this.router.navigate(['/vehicles']);

  }
}