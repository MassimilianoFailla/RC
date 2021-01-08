import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fields } from '../Config/Fields';
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

  tipo: number;
  config: any;
  message: string;


  constructor(private route: ActivatedRoute, private fb: FormBuilder, private userService: UserService,
    private reservationService: ReservationService, private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.tipo = Number(this.route.snapshot.paramMap.get('tipo'));

    console.log(this.tipo);
    if (this.tipo === 1) {
      this.message = 'Aggiungi Utente';
      this.config = {

        campi: ['Nome', 'Cognome', 'Anno Nascita', 'Codice Fiscale', 'Email', 'Username', 'Password', 'Role'],
        tipo: 1,
      };
    }


    if (this.tipo === 2) {
      this.message = 'Aggiungi Veicolo';
      this.config = {

        campi: ['Casa Costruttrice', 'Anno Immatricolazione', 'Modello', 'Targa'],
        tipo: 2,
      };
    }

    if (this.tipo === 3) {
      this.message = 'Aggiungi Prenotazione';
      this.config = {
        campi: ['dataInizio', 'dataFine'],
        tipo: 3,
      };
    }
  }

  onSubmit(form: NgForm) {
    if (this.tipo === 1) {
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
    }
    if (this.tipo === 2) {

      let vehicles: Vehicles = {
        id: form.value.id,
        annoImmatricolazione: form.value.annoImmatricolazione,
        casaCostruttrice: form.value.casaCostruttrice,
        modello: form.value.modello,
        targa: form.value.targa,
      }
    }
    if (this.tipo === 3) {
      let reservations: Reservations = {
        id: form.value.id,
        dataInizio: form.value.dataInizio,
        dataFine: form.value.dataFine,
      }
    }
  }
} 