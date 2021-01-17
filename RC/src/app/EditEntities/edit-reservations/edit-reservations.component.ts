import { ReservationDataService } from './../../Services/Data/reservation-data-service.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Reservations } from 'src/app/Entities/reservation/Reservations';
import { ReservationService } from 'src/app/Services/Services-Entities/reservation.service';
import { ApiMsg } from 'src/app/Entities/user/user.component';
@Component({
  selector: 'app-edit-reservations',
  templateUrl: './edit-reservations.component.html',
  styleUrls: ['./edit-reservations.component.css']
})
export class EditReservationsComponent implements OnInit {

  id: number = 0;
  header: string;
  IsModifica2: boolean = false;
  IsModifica: string;
  Conferma: string = '';
  Errore: string = '';
  apiMsg: ApiMsg;

  reservationsList: Reservations;

  constructor(private router: Router, private route: ActivatedRoute,
    private resDataService: ReservationDataService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.reservationsList = new Reservations(12, "", "");

    // ottengi i dati dell'utente
    if (this.id != -1) {
      this.IsModifica2 = true;

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
      this.resDataService.updReservation(this.reservationsList).subscribe(
        response => {
          console.log(response);
          this.apiMsg = response;
          this.Conferma = this.apiMsg.message;
          console.log(this.Conferma);
          this.router.navigate(['/reservations']);
        },
        error => {
          this.Errore = error.error.messaggio;
          console.log(this.Errore);
        }
      )
  }
}