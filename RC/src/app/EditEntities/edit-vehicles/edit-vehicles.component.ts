import { VehicleDataService } from './../../Services/Data/vehicle-data-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Vehicles } from 'src/app/Entities/vehicle/Vehicles';
import { ApiMsg } from 'src/app/Entities/user/user.component';

@Component({
  selector: 'app-edit-vehicles',
  templateUrl: './edit-vehicles.component.html',
  styleUrls: ['./edit-vehicles.component.css']
})
export class EditVehiclesComponent implements OnInit {

  id: number = 0;
  header: string;
  isModifica2: boolean = false;
  isModifica: string;
  conferma: string = '';
  errore: string = '';
  apiMsg: ApiMsg;

  vehiclesList: Vehicles = {
    id: 0,
    casaCostruttrice: '',
    modello: '',
    annoImmatricolazione: new Date(),
    targa: '',
    tipologia: '',
  };

  constructor(private router: Router, private route: ActivatedRoute, private vehicleDataService: VehicleDataService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    console.log("valore di id -> "+this.id); 

    this.vehiclesList = new Vehicles(this.id, '', new Date(), '' , '', '');

    // ottengi i dati dell'utente
    if (this.id != -1) {
      this.isModifica2 = true;

      this.vehicleDataService.getVehicleById(this.id).subscribe(
        response => {
          this.vehiclesList = response;
          console.log(this.vehiclesList);
        },
        error => {
          console.log(error.error.messaggio);
        }
      )
    } else {
      this.isModifica2 = false;
    }
  }

  abort() {
    this.router.navigate(['/vehicles',]);
  }

  salva() {

    this.conferma = '';
    this.errore = '';
      // aggiornamento !!!
      this.vehicleDataService.updVehicle(this.vehiclesList).subscribe(
        response => {
          console.log(response);
          this.apiMsg = response;
          this.conferma = this.apiMsg.message;
          console.log(this.conferma);
          alert("modifica veicolo eseguita con successo!");
          this.router.navigate(['/vehicles']);
        },
        error => {
          this.errore = error.error.messaggio;
          console.log(this.errore);
        }
      )
  }
}