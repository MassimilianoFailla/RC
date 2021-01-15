import { VehicleDataService } from './../../Services/Data/vehicle-data-service.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Vehicles } from 'src/app/Entities/vehicle/Vehicles';
import { UserService } from 'src/app/Services/Services-Entities/user.service';
import { VehicleService } from 'src/app/Services/Services-Entities/vehicle.service';

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
  IsModifica = "";

  // veicoli
  vehiclesList: Vehicles = {
    id: 0,
    casaCostruttrice: '',
    annoImmatricolazione: '',
    modello: '',
    targa: '',
  }

  constructor(private router: Router, private route: ActivatedRoute, private vehicleService: VehicleService,
    private vehicleDataService: VehicleDataService ) { }


  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.header = this.id === 0 ? 'Adding page' : 'Editing page';

    if (this.id != 0) {
      this.vehiclesList = this.vehicleService.onGetVehicles(this.id);
    }

  }

  abort() {
    alert('stai tornando alla tabella degli utenti')
    this.router.navigate(['/vehicles']);
  }

  onSubmit(form: NgForm) {

    let vehicles: Vehicles = {
      id: form.value.id,
      annoImmatricolazione: form.value.annoImmatricolazione,
      casaCostruttrice: form.value.casaCostruttrice,
      modello: form.value.modello,
      targa: form.value.targa,
    }
    this.vehicleDataService.updVehicle(this.vehiclesList);
    
    if (this.id === 0) {
      this.vehicleDataService.insVehicle(vehicles);
    }
  }

}