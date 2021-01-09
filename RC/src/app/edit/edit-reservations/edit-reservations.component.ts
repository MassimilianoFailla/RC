import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Reservations } from 'src/app/Entities/reservation/Reservations';
import { ReservationService } from 'src/app/Service/Services-Entities/reservation.service';
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

  // reservation
  reservationsList: Reservations = {
    id: 0,
    dataInizio: '',
    dataFine: '',
  }

  constructor(private router: Router, private route: ActivatedRoute, 
     private reservationService: ReservationService) { }


  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.header = this.id === 0 ? 'Adding page' : 'Editing page';

    if (this.id != 0) {
      // this.reservationsList = this.reservationService.onGetReservation(this.id);
    }
  }

  onSubmit(form: NgForm) {

    let reservations: Reservations = {
      id: form.value.id,
      dataInizio: form.value.dataInizio,
      dataFine: form.value.dataFine,
    }

    // this.reservationService.onUpdate(this.reservationsList);

    if (this.id === 0) {
      // this.reservationsList.onAdd(reservations);
    }
  }

  // edit() {
  //   this.usersService.onUpdate(this.usersList);
  //   this.vehicleService.onUpdate(this.vehiclesList);
  // }
}