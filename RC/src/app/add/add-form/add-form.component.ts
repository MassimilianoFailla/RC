import { data } from 'jquery';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonsConfig } from 'src/app/Config/ButtonsConfig';
import { TablesConfig } from 'src/app/Config/TablesConfig';
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
  configTable: TablesConfig;

  configadd: ButtonsConfig = {
    customCssClass: 'btn btn-primary',
    text: 'aggiungi',
    icon: 'oi oi-plus'
  };

  constructor(private vehicleService: VehicleService, private fb: FormBuilder,) {
  }

  ngOnInit(): void {

    this.idUser = null;
    this.targa = null;
    this.campi = this.config.campi;
    this.tipo = this.config.tipo;

    if (this.tipo === 1) {
      this.form = this.fb.group({
        annoImmatricolazione: ['', Validators.required],
        casaCostruttrice: ['', Validators.required],
        modello: ['', Validators.required],
        targa: ['', Validators.required],
      });
    }

    if (this.tipo === 2) {
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

    if (this.tipo === 3) {
      // this.idUser = 1;
      // this.vehicleService.getVehicles().subscribe(
      //   result => {
      //     this.vehicles = result;
      //     console.log(this.vehicles);
      //   }
      // );

      // this.vehicleConfig = new ShowVehicleConfig();

      // this.configTable = {
      //   headers: this.vehicleConfig.header,
      //   order: this.vehicleConfig.orderconfig,
      //   search: this.vehicleConfig.searchconfig,
      //   pagination: this.vehicleConfig.pagination,
      //   actions: [],

      // };

      this.form = this.fb.group({
        // targa: ['', Validators.required],
        dataInizio: ['', Validators.required],
        dataFine: ['', Validators.required],
      });
    }
  }

  submit() {
    console.log('sono in add-fomr');
    this.values = this.form.value;
    
    this.submitter.emit({values: this.values, targa: this.targa, idUser: this.idUser});

  }
}