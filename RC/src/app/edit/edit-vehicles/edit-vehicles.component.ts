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
  selector: 'app-edit-vehicles',
  templateUrl: './edit-vehicles.component.html',
  styleUrls: ['./edit-vehicles.component.css']
})
export class EditVehiclesComponent implements OnInit {

  id: number;
  header: string;
  tipo: number;
  config: any;
  message: string;

  // veicoli
  vehiclesList: Vehicles = {
    id: 0,
    casaCostruttrice: '',
    annoImmatricolazione: '',
    modello: '',
    targa: '',
  }

  constructor(private router: Router, private route: ActivatedRoute, private usersService: UserService,
    private vehicleService: VehicleService, private reservationService: ReservationService) { }


  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.header = this.id === 0 ? 'Adding page' : 'Editing page';

    if (this.id != 0) {
      this.vehiclesList = this.vehicleService.onGetVehicles(this.id);
    }

  }

  onSubmit(form: NgForm) {

    let vehicles: Vehicles = {
      id: form.value.id,
      annoImmatricolazione: form.value.annoImmatricolazione,
      casaCostruttrice: form.value.casaCostruttrice,
      modello: form.value.modello,
      targa: form.value.targa,
    }
    this.vehicleService.onUpdate(this.vehiclesList);
    
    if (this.id === 0) {
      this.vehicleService.onAdd(vehicles);
    }
  }

}