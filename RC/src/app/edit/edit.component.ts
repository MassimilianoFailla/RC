import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservations } from '../Entities/reservation/Reservations';
import { Users } from '../Entities/user/Users';
import { Vehicles } from '../Entities/vehicle/Vehicles';
import { ReservationService } from '../Service/Services-Entities/reservation.service';
import { UserService } from '../Service/Services-Entities/user.service';
import { VehicleService } from '../Service/Services-Entities/vehicle.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

  id: number;
  header: string;

  // utenti
  usersList: Users = {
    id: 0,
    nome: '',
    cognome: '',
    dataNascita: '',
    codiceFiscale: '',
    email: '',
    username: '',
    password: '',
    role: '',
  };

  // veicoli
  vehiclesList: Vehicles = {
    id: 0,
    casaCostruttrice: '',
    annoImmatricolazione: '',
    modello: '',
    targa: '',
  }

  // reservation
  reservationsList: Reservations = {
    id: 0,
    dataInizio: '',
    dataFine: '',
  }

  constructor(private router: Router, private route: ActivatedRoute, private usersService: UserService,
     private vehicleService: VehicleService, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.header = this.id === 0 ? 'Adding page' : 'Editing page';

    if (this.id != 0) {
      this.usersList = this.usersService.onGetUsers(this.id);
      this.vehiclesList = this.vehicleService.onGetVehicles(this.id);
    }
  }

  onSubmit(form: NgForm) {
    let users: Users = {
      id: form.value.id,
      nome: form.value.nome,
      cognome: form.value.cognome,
      dataNascita: form.value.dataNascita,
      codiceFiscale: form.value.codiceFiscale,
      email: form.value.email,
      username: form.value.username,
      password: form.value.password,
      role: form.value.role,
    }

    let vehicles: Vehicles = {
      id: form.value.id,
      annoImmatricolazione: form.value.annoImmatricolazione,
      casaCostruttrice: form.value.casaCostruttrice,
      modello: form.value.modello,
      targa: form.value.targa,
    }

    let reservations: Reservations = {
      id: form.value.id,
      dataInizio: form.value.dataInizio,
      dataFine: form.value.dataFine,
    }

    if (this.id === 0) {
      this.usersService.onAdd(users);
      this.vehicleService.onAdd(vehicles);
      // this.reservationService.onAdd(reservations);
    }
    else {
      this.usersService.onUpdate(users);
      this.vehicleService.onUpdate(vehicles);
      // this.reservationService.onUpdate(reservations);
    }
    this.router.navigateByUrl('');
  }

  // spostarlo fuori eventEmitter
  onDelete(id: Number) {
    this.usersService.onDelete(id);
    this.vehicleService.onDelete(id);
    // this.reservationService.onDelete(id);
  }

  edit(){
      this.usersService.onUpdate(this.usersList);
      this.vehicleService.onUpdate(this.vehiclesList);

  }
}