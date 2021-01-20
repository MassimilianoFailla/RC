import { VehicleDataService } from './../../Services/Data/vehicle-data-service.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Vehicles } from 'src/app/Entities/vehicle/Vehicles';
import { UserService } from 'src/app/Services/Services-Entities/user.service';
import { VehicleService } from 'src/app/Services/Services-Entities/vehicle.service';
import { ApiMsg } from 'src/app/Entities/user/user.component';

@Component({
  selector: 'app-edit-vehicles',
  templateUrl: './edit-vehicles.component.html',
  styleUrls: ['./edit-vehicles.component.css']
})
export class EditVehiclesComponent implements OnInit {

  id: number = 0;
  header: string;
  IsModifica2: boolean = false;
  IsModifica: string;
  Conferma: string = '';
  Errore: string = '';
  apiMsg: ApiMsg;

  vehiclesList: Vehicles = {
    id: 0,
    casaCostruttrice: '',
    modello: '',
    annoImmatricolazione: new Date(),
    targa: '',
    tipologia: '',
  };

  constructor(private router: Router, private route: ActivatedRoute,
    private vehicleDataService: VehicleDataService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.vehiclesList = new Vehicles();

    // ottengi i dati dell'utente
    if (this.id != -1) {
      this.IsModifica2 = true;

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
      this.IsModifica2 = false;
    }
  }

  abort() {
    this.router.navigate(['/vehicles',]);
  }

  salva() {

    this.Conferma = '';
    this.Errore = '';
      // aggiornamento !!!
      this.vehicleDataService.updVehicle(this.vehiclesList).subscribe(
        response => {
          console.log(response);
          this.apiMsg = response;
          this.Conferma = this.apiMsg.message;
          console.log(this.Conferma);
          alert("modifica veicolo eseguita con successo!");
          this.router.navigate(['/vehicles']);
        },
        error => {
          this.Errore = error.error.messaggio;
          console.log(this.Errore);
        }
      )
  }
}