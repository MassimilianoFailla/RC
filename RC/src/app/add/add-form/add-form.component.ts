import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

//   @Input() config: any;
//   @Output() submitter = new EventEmitter<any>();
//   values: any[];
//   form: FormGroup;
//   campi: any[];
//   tipo: number;
//   idUser: number;
//   targa: string;

//   vehicles: Vehicles[];
//   configTable: TablesConfig;

//   configadd: ButtonsConfig = {
//     text: 'Save',
//     customCssClass : 'btn btn-primary',
//     icon: 'oi oi-plus'
//  };

//  constructor(private vehicleService: VehicleService, private fb: FormBuilder, ) { }

//  ngOnInit(): void {

//   this.idUser = null;
//   this.targa = null;
//   this.campi = this.config.campi;
//   this.tipo = this.config.tipo;

//   if(this.tipo === 1){
//     this.form = this.fb.group({
//       nome: ['', Validators.required],
//       cognome: ['', Validators.required],
//       email: ['', Validators.required],
//       password: ['', Validators.required],
//     });
//   }

//   if (this.tipo === 2){
//     this.form = this.fb.group({
//     targa: ['', Validators.required],
//     modello: ['', Validators.required],
//     casa: ['', Validators.required],
//     anno: ['', Validators.required],
//   });
// }

//   if (this.tipo === 3){
//     this.idUser = 1;
//     this.vehicleService.getVehicles().subscribe(
//       result => {
//         this.vehicles = result;
//         console.log(this.vehicles);
//       }
//     );

//     this.form = this.fb.group({
//       targa: ['', Validators.required],
//       dataInizio: ['', Validators.required],
//       dataFine: ['', Validators.required],
//     });
//   }
// }

// submit(){

//   console.log('sono in add-fomr');
//   this.values = this.form.value;
//   this.submitter.emit({values: this.values, targa: this.targa, idUser: this.idUser});

// }
}
