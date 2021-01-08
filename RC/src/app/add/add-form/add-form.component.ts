import { ReservationService } from './../../Service/Services-Entities/reservation.service';
import { UserService } from 'src/app/Service/Services-Entities/user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonsConfig } from 'src/app/Config/ButtonsConfig';
import { TablesConfig } from 'src/app/Config/TablesConfig';
import { Reservations } from 'src/app/Entities/reservation/Reservations';
import { Users } from 'src/app/Entities/user/Users';
import { Vehicles } from 'src/app/Entities/vehicle/Vehicles';
import { VehicleService } from 'src/app/Service/Services-Entities/vehicle.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  @Input() config: any;
  @Output() submitter = new EventEmitter<any>();

  values: any[];
  form: FormGroup;
  campi: any[];
  tipo: number;
  idUser: number;
  targa: string;

  vehicles: Vehicles[];
  users: Users[];
  reservation: Reservations[];
  tables: TablesConfig;

  configadd: ButtonsConfig = {
    customCssClass: 'btn btn-primary',
    text: 'Save',
    icon: 'oi oi-plus'
  };

  constructor(private vehicleService: VehicleService, private fb: FormBuilder, private userService: UserService, private reservationService: ReservationService) {
  }

  ngOnInit(): void {

    this.idUser = null;
    this.targa = null;
    this.campi = this.config.campi;
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
    console.log('Add-Fomr');
    this.values = this.form.value;
    this.submitter.emit({ values: this.values });
    // targa: this.targa, idUser: this.idUser

  }
}