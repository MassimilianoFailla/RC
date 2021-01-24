import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Reservations } from 'src/app/Entities/reservation/Reservations';
import { ApiMsg } from 'src/app/Entities/user/user.component';
import { Users } from 'src/app/Entities/user/Users';
import { Vehicles } from 'src/app/Entities/vehicle/Vehicles';
import { ReservationDataService } from 'src/app/Services/Data/reservation-data-service.service';

@Component({
  selector: 'app-add-reservations',
  templateUrl: './add-reservations.component.html',
  styleUrls: ['./add-reservations.component.css']
})
export class AddReservationsComponent implements OnInit {

  idUtente: 7; // per prova

  errore: string = '';
  isModifica: boolean = false;
  conferma: string = '';

  targaProva: string;
  modelloVeicoloProva: string;

  apiMsg: ApiMsg;

  utente: Users; // da inserire dentro reservations
  veicolo: Vehicles;  // da inserire dentro reservations
  
  listaVeicoli: Vehicles[]; // per trovare la lista dei veicoli

  // reservations
  reservationsList: Reservations = {
    id: 0,
    dataInizio: new Date(),
    dataFine: new Date(),
    utente: new Users(0, '', '', new Date(), '', '', '', '', ''),
    veicolo: new Vehicles(0, '', new Date(), '', '', ''),
    approvazione: false,
  };

  constructor(private router: Router, private resDataService: ReservationDataService) { }

  ngOnInit(): void {

      // Otteniamo i dati dei veicoli 
    this.resDataService.getVehicles().subscribe(
      response => {
        this.listaVeicoli = response;
        console.log("Lista veicoli -> ", response);

        // trovo il veicolo tramite la targa selezionata ciclando la lista dei veicoli
        for (let i = 0; i < this.listaVeicoli.length; i++) {

          const targaVeicoli = this.listaVeicoli[i].targa;
          console.log("Targa veicoli trovati -> ", targaVeicoli);

          // e trovo il veicolo selezionato tramite la targa
          this.resDataService.getVehiclesByTarga(targaVeicoli).subscribe(
          response => {
            this.veicolo = response;
            console.log("Veicolo trovato: -> ", this.veicolo);
          },
          error => {
            console.log(error);
          }
          )
        }
      },
      error => {
        console.log(error);
      }
    )

    //Otteniamo i dati dell'utente, in questo caso la prova con id 7
    // da implementare la ricerca dell'id dell'utente non appena l'utente si logga
    this.resDataService.getUserById(1).subscribe(
      response => {
        this.utente = response;
        console.log("Dati utente -> ", response);
      },
      error => {
        console.log(error);
      }
    )
  }

  abort() {
    alert('stai tornando alla tabella delle prenotazioni')
    this.router.navigate(['/reservations']);
  }

  onSubmit(form: NgForm) {

    let reservationsList: Reservations = {
      id: form.value.id,
      dataInizio: form.value.dataInizio,
      dataFine: form.value.dataFine,
      utente: this.utente,
      veicolo: this.veicolo,
      approvazione: form.value.approvazione,
    }

    this.resDataService.InsReservation(reservationsList).subscribe(
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
    alert("Nuova prenotazione salvata con successo!");
    this.router.navigate(['/reservations']);
  }
}