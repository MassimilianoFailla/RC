import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TablesConfig } from 'src/app/Config/TablesConfig';
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

  id: number;

  errore: string = '';
  isModifica: boolean = false;
  conferma: string = '';

  apiMsg: ApiMsg;

  user: Users;  // per l'ottenimento dei dati
  vehicle: Vehicles;   // per l'ottenimento dei dati

  // reservations
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

    // ottengo i dati dell'utente
    this.resDataService.getUsers().subscribe(
      response => {
      this.user = response;
        console.log(this.user);
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )

    // ottengo i dati dei veicoli
    this.resDataService.getVehicles().subscribe(
      response => {
       this.vehicle = response;
        console.log(response);
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
      idUtente: form.value.idUtente,
      cognomeUtente: form.value.cognomeUtente,
      modelloVeicolo: form.value.modelloVeicolo,
      targaVeicolo: form.value.targaVeicolo,
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