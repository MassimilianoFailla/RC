import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Reservations } from 'src/app/Entities/reservation/Reservations';
import { Users } from 'src/app/Entities/user/Users';
import { Vehicles } from 'src/app/Entities/vehicle/Vehicles';
import { ReservationService } from 'src/app/Service/Services-Entities/reservation.service';
import { UserService } from 'src/app/Service/Services-Entities/user.service';
import { VehicleService } from 'src/app/Service/Services-Entities/vehicle.service';

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
    dataFine: '',
  }

  constructor(private router: Router, private route: ActivatedRoute, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.header = this.id === 0 ? 'Adding page' : 'Editing page';

    if (this.id != 0) {
      // this.reservationsList = this.reservationService.onGetReservations(this.id);
    }
  }

  onSubmit(form: NgForm) {

    let reservations: Reservations = {
      id: form.value.id,
      dataInizio: form.value.dataInizio,
      dataFine: form.value.dataFine,
    }
    if (this.id === 0) {
      // this.reservationService.onAdd(reservations);
    }
  }
}
