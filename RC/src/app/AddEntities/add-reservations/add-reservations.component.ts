import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TablesConfig } from 'src/app/Config/TablesConfig';
import { Reservations } from 'src/app/Entities/reservation/Reservations';
import { ApiMsg } from 'src/app/Entities/user/user.component';
import { Users } from 'src/app/Entities/user/Users';
import { Vehicles } from 'src/app/Entities/vehicle/Vehicles';
import { ReservationDataService } from 'src/app/Services/Data/reservation-data-service.service';
import { ReservationService } from 'src/app/Services/Services-Entities/reservation.service';
@Component({
  selector: 'app-add-reservations',
  templateUrl: './add-reservations.component.html',
  styleUrls: ['./add-reservations.component.css']
})
export class AddReservationsComponent implements OnInit {
  id: number;
  header: string;
  @Input() tables: TablesConfig;

  Errore: string = '';
  IsModifica: boolean = false;
  Conferma: string = '';

  apiMsg: ApiMsg;
  utente: Users;
  veicolo: Vehicles;

  // utenti
  reservationsList: Reservations = {
    id: 0,
    dataInizio: new Date(),
    dataFine: new Date(),
    utente: new Users(),
    veicolo: new Vehicles(),
    approvazione: false,
  };

  constructor(private router: Router, private route: ActivatedRoute, private reservationService: ReservationService,
    private resDataService: ReservationDataService) { }

  ngOnInit(): void {

    // ottengo i dati dell'utente
    this.resDataService.getUsers().subscribe(
      response => {
        this.reservationsList.utente = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )

    // ottengo i dati dei veicoli
    this.resDataService.getVehicles().subscribe(
      response => {
        this.reservationsList.veicolo = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }

  abort() {
    alert('stai tornando alla tabella delle prenotazioni')
    this.router.navigate(['/users']);
  }

  onSubmit(form: NgForm) {
    let reservationsList: Reservations = {
      id: form.value.id,
      dataInizio: form.value.dataInizio,
      dataFine: form.value.dataFine,
      utente: form.value.utente,
      veicolo: form.value.veicolo,
      approvazione: form.value.approvazione,
    }
    this.resDataService.insReservation(reservationsList).subscribe(
      response => {
        console.log(response);
        this.apiMsg = response;
        this.Conferma = this.apiMsg.message;
        console.log(this.Conferma);
      },
      error => {
        this.Errore = error.error.messaggio;
        console.log(this.Errore);
      }
    )
    alert("Nuova prenotazione salvata con successo!");
    this.router.navigate(['/reservations']);
  }
}