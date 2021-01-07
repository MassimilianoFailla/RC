import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservations } from '../Entities/reservation/Reservations';
import { Users } from '../Entities/user/Users';
import { Vehicles } from '../Entities/vehicle/Vehicles';
import { ReservationService } from '../Service/Services-Entities/reservation.service';
import { UserService } from '../Service/Services-Entities/user.service';
import { VehicleService } from '../Service/Services-Entities/vehicle.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

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
    }
  }

  // ----------------- ^ vecchia configurazione ---------------------------------------

//   tipo: number;
//   config: any;
//   vehicleForm: FormGroup;
//   message: string;

//   constructor(private route: ActivatedRoute, private fb: FormBuilder, private userService: UserService,
//     private reservationService: ReservationService, private vehicleService: VehicleService) { }

//   ngOnInit(): void {
//     this.tipo = Number(this.route.snapshot.paramMap.get('tipo'));

//     if (this.tipo === 1) {
//       this.message = 'Aggiungi Veicolo';
//       this.config = {
//         campi: ['annoImmatricolazione', 'casaCostruttrice', 'modello', 'targa'],
//         tipo: 1,
//       };
//     }

//     if (this.tipo === 2) {
//       this.message = 'Aggiungi Utente';
//       this.config = {
//         campi: ['nome', 'cognome', 'dataNascita', 'codiceFiscale', 'email', 'username', 'password', 'role'],
//         tipo: 2,
//       };
//     }

//     if (this.tipo === 3) {
//       this.message = 'Aggiungi Prenotazione';
//       this.config = {
//         campi: ['dataInizio', 'dataFine'],
//         tipo: 3,
//       };
//     }
//   }
//   submit(object: any) {

//     if (this.tipo === 1) {
//       let vehicles: Vehicles = {
//         id: object.value.id,
//         annoImmatricolazione: object.value.annoImmatricolazione,
//         casaCostruttrice: object.value.casaCostruttrice,
//         modello: object.value.modello,
//         targa: object.value.targa,
//       }
//       this.vehicleService.onAdd(vehicles);
//     }

//     if (this.tipo === 2) {
//       let users: Users = {
//         id: object.value.id,
//         nome: object.value.nome,
//         cognome: object.value.cognome,
//         dataNascita: object.value.dataNascita,
//         codiceFiscale: object.value.codiceFiscale,
//         email: object.value.email,
//         username: object.value.username,
//         password: object.value.password,
//         role: object.value.role,
//       }
//       this.userService.onAdd(users);
//     }

//     if (this.tipo === 3) {
//       let reservations: Reservations = {
//         id: object.value.id,
//         dataInizio: object.value.dataInizio,
//         dataFine: object.value.dataFine,
//       }
//       // this.reservationService.onAdd(reservations);
//     }
//   }
// }