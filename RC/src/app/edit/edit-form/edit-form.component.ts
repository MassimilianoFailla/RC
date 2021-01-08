import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TablesConfig } from 'src/app/Config/TablesConfig';
import { Reservations } from 'src/app/Entities/reservation/Reservations';
import { Users } from 'src/app/Entities/user/Users';
import { Vehicles } from 'src/app/Entities/vehicle/Vehicles';
import { ReservationService } from 'src/app/Service/Services-Entities/reservation.service';
import { UserService } from 'src/app/Service/Services-Entities/user.service';
import { VehicleService } from 'src/app/Service/Services-Entities/vehicle.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  
  @Input() config: any;
  @Output() submitter = new EventEmitter<any>();

  values: any[];
  form: FormGroup;
  tipo: number;
  idUser: number;
  targa: string;

  vehicles: Vehicles[];
  users: Users[];
  reservation: Reservations[];
  tables: TablesConfig;

  constructor(private vehicleService: VehicleService, private fb: FormBuilder, private userService: UserService, private reservationService: ReservationService) {
  }

  ngOnInit(): void {

    this.idUser = null;
    this.targa = null;
    this.tipo = this.config.tipo;

    if (this.tipo === 1) {
      this.form = this.fb.group({
        nome: ['', Validators.required],
        cognome: ['', Validators.required],
        dataNascita: ['', Validators.required],
        codiceFiscale: ['', Validators.required],
        email: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        role: ['', Validators.required],
      });
    }

    if (this.tipo === 2) {
      this.form = this.fb.group({
        casaCostruttrice: ['', Validators.required],
        annoImmatricolazione: ['', Validators.required],
        modello: ['', Validators.required],
        targa: ['', Validators.required],
      });
    }

    if (this.tipo === 3) {
      this.form = this.fb.group({
        targa: ['', Validators.required],
        dataInizio: ['', Validators.required],
        dataFine: ['', Validators.required],
      });
    }
  }

  submit() {
    console.log('Edit-Form');
    this.values = this.form.value;
    this.submitter.emit({ values: this.values });
    // targa: this.targa, idUser: this.idUser
  }
}