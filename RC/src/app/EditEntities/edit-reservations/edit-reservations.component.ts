import { ReservationDataService } from './../../Services/Data/reservation-data-service.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Reservations } from 'src/app/Entities/reservation/Reservations';
import { ReservationService } from 'src/app/Services/Services-Entities/reservation.service';
@Component({
  selector: 'app-edit-reservations',
  templateUrl: './edit-reservations.component.html',
  styleUrls: ['./edit-reservations.component.css']
})
export class EditReservationsComponent implements OnInit {

  id: number;
  header: string;
  tipo: number;
  config: any;
  message: string;
  IsModifica = "";

  // reservation
  reservationsList: Reservations = {
    id: 0,
    dataInizio: '',
    dataFine: '',
  }

  constructor(private router: Router, private route: ActivatedRoute, private reservationService: ReservationService,
    private reservationDataService: ReservationDataService) { }


  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.header = this.id === 0 ? 'Adding page' : 'Editing page';

    if (this.id != 0) {
      // this.reservationsList = this.reservationService.onGetReservation(this.id);
    }
  }

  abort() {
    alert('stai tornando alla tabella degli utenti')
    this.router.navigate(['/reservations']);
  }

  onSubmit(form: NgForm) {
    let reservations: Reservations = {
      id: form.value.id,
      dataInizio: form.value.dataInizio,
      dataFine: form.value.dataFine,
    }

    this.reservationDataService.updReservation(this.reservationsList);

    if (this.id === 0) {
      this.reservationDataService.insReservation(reservations);
    }
  }
}