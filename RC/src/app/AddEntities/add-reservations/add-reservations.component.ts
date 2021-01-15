import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Reservations } from 'src/app/Entities/reservation/Reservations';
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

  // reservation
  reservationsList: Reservations = {
    id: 0,
    dataInizio: '',
    dataFine: ''
  }

  constructor(private router: Router, private route: ActivatedRoute, private reservationService: ReservationService,
    private reservationDataService: ReservationDataService) { }

    ngOnInit(): void {
      this.id = +this.route.snapshot.paramMap.get('id');
      this.header = this.id === 0 ? 'Adding page' : 'Editing page';
  
      if (this.id != 0) {
        this.reservationsList = this.reservationService.onGetReservations(this.id);
      }
    }

  abort() {
    alert('stai tornando alla tabella delle prenotazioni')
    this.router.navigate(['/reservations']);
  }


  onSubmit(form: NgForm) {

    let reservations: Reservations = {
      id: form.value.id,
      dataInizio: form.value.dataInizio,
      dataFine: form.value.dataFine,
    }
    if (this.id === 0) {
      this.reservationDataService.insReservation(reservations);
    }
  }
}
