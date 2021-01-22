import { ReservationDataService } from './../../Services/Data/reservation-data-service.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Reservations } from 'src/app/Entities/reservation/Reservations';
import { ApiMsg } from 'src/app/Entities/user/user.component';
import { Users } from 'src/app/Entities/user/Users';
import { Vehicles } from 'src/app/Entities/vehicle/Vehicles';
@Component({
  selector: 'app-edit-reservations',
  templateUrl: './edit-reservations.component.html',
  styleUrls: ['./edit-reservations.component.css']
})
export class EditReservationsComponent implements OnInit {

  id: any;
  isModifica2: boolean = false;
  isModifica: string;
  conferma: string = '';
  errore: string = '';
  apiMsg: ApiMsg;

  // entità di user e veicolo
  utente: Users;
  veicolo: Vehicles;

  reservationsList: Reservations = {
    id: 0, 
    dataInizio: new Date(),
    dataFine: new Date(),
    idUtente: 0,
    cognomeUtente: '',
    modelloVeicolo: '',
    targaVeicolo: '',
    approvazione: false,
  };

  constructor(private router: Router, private route: ActivatedRoute, private resDataService: ReservationDataService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.reservationsList = new Reservations();

    // ottengi i dati della prenotazione
    if (this.id != -1) {
      this.isModifica2 = true;

      this.resDataService.getReservationsById(this.id).subscribe(
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

    // ottengo i dati dell'utente
    this.resDataService.getUsers().subscribe(
      response => {
        this.reservationsList.idUtente = response.id;
        this.reservationsList.cognomeUtente = response.cognome;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )

    // ottengo i dati dei veicoli
    this.resDataService.getVehicles().subscribe(
      response => {
        // this.reservationsList.modelloVeicolo = response.modello;
        this.veicolo = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }

  abort() {
    this.router.navigate(['/reservations',]);
  }

  salva() {

    this.conferma = '';
    this.errore = '';
      // aggiornamento !!!
      this.resDataService.updReservation(this.reservationsList).subscribe(
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