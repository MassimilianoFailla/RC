import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservations } from '../Entities/reservation/Reservations';
import { ApiMsg } from '../Entities/user/user.component';
import { Users } from '../Entities/user/Users';
import { Vehicles } from '../Entities/vehicle/Vehicles';
import { ReservationDataService } from '../Services/Data/reservation-data-service.service';
import { UserDataService } from '../Services/Data/user-data-service.service';
import { VehicleDataService } from '../Services/Data/vehicle-data-service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: any;
  isModifica2: boolean = false;
  IsModifica: string;
  conferma: string = '';
  errore: string = '';
  apiMsg: ApiMsg;
  tipo: number;

  // entità di user e veicolo
  utente: Users;
  veicolo: Vehicles;

  usersList: Users = {
    id: 0,
    nome: '',
    cognome: '',
    dataNascita: new Date(),
    codiceFiscale: '',
    email: '',
    username: '',
    password: '',
    role: '',
  };


  vehiclesList: Vehicles = {
    id: 0,
    casaCostruttrice: '',
    modello: '',
    annoImmatricolazione: new Date(),
    targa: '',
    tipologia: '',
  };

  reservationsList: Reservations = {
    id: 0,
    dataInizio: new Date(),
    dataFine: new Date(),
    utente: new Users(0, '', '', new Date(), '', '', '', '', ''),
    veicolo: new Vehicles(0, '', new Date(), '', '', ''),
    approvazione: false,
  };

  constructor(private route: ActivatedRoute, private router: Router, private userDataService: UserDataService, private vehicleDataService: VehicleDataService,
    private reservationDataService: ReservationDataService) { }

  ngOnInit(): void {

    this.tipo = Number(this.route.snapshot.paramMap.get('tipo'));

    if (this.tipo === 1) {
      // utente
      this.id = this.route.snapshot.params['id'];
      console.log("valore di id -> " + this.id);

      this.usersList = new Users(this.id, '', '', new Date(), '', '', '', '', '');

      // ottengi i dati dell'utente
      if (this.id != -1) {
        this.isModifica2 = true;
        this.userDataService.getUserById(this.id).subscribe(
          response => {
            this.usersList = response;
            console.log(this.usersList);
          },
          error => {
            console.log(error.error.messaggio);
          }
        )
      } else {
        this.isModifica2 = false;
      }
    }

     if (this.tipo === 2) {

      // veicolo
      this.id = this.route.snapshot.params['id'];
      console.log("valore di id -> " + this.id);

      this.vehiclesList = new Vehicles(this.id, '', new Date(), '', '', '');

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

    if (this.tipo === 3) {

      // prenotazione
      this.id = this.route.snapshot.params['id'];
      console.log("valore di id -> " + this.id);
  
      // ottengi i dati della prenotazione
      if (this.id != -1) {
        this.isModifica2 = true;

        this.reservationDataService.getReservationsById(this.id).subscribe(
          response => {

            this.reservationsList = response;
            console.log(this.reservationsList);

          },
          error => {
            console.log(error.error.messaggio);
          }
        )
      } else {
        this.isModifica2 = false;
      }
    }
  }

  abort() {
    alert("Stai per tornare alla home!");
    this.router.navigate(['',]);
  }


  aggiorna() {
    if (this.tipo === 1) {

      // utente
      this.conferma = '';
      this.errore = '';
      // aggiornamento !!!
      this.userDataService.updUser(this.usersList).subscribe(
        response => {
          console.log(response);
          this.apiMsg = response;
          this.conferma = this.apiMsg.message;
          console.log(this.conferma);
          alert("modifica utente eseguita con successo!");
          this.router.navigate(['/users']);
        },
        error => {
          this.errore = error.error.messaggio;
          console.log(this.errore);
        }
      )
    }
    if (this.tipo === 2) {

      // veicolo
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

    if (this.tipo === 3) {

      // prenotazione
      this.conferma = '';
      this.errore = '';

      // aggiornamento prenotazione!!!
      this.reservationDataService.updReservation(this.reservationsList).subscribe(
        response => {
          console.log(response);
          this.apiMsg = response;
          this.conferma = this.apiMsg.message;
          console.log(this.conferma);
          alert("modifica prenotazione eseguita con successo!");
          this.router.navigate(['/reservations']);
        },
        error => {
          this.errore = error.error.messaggio;
          console.log(this.errore);
        }
      )
    }
  }

}
