import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ButtonsConfig } from 'src/app/Config/ButtonsConfig';
import { Orders } from 'src/app/Config/Orders';
import { Paginations } from 'src/app/Config/Paginations';
import { Search } from 'src/app/Config/Search';
import { TablesConfig } from 'src/app/Config/TablesConfig';
import { Router } from '@angular/router';
import { VehicleDataService } from 'src/app/Services/Data/vehicle-data-service.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  constructor(private router: Router, private vehicleDataService: VehicleDataService) { }

  conferma: string = '';
  errore: string = '';
  apiMsg: ApiMsg;
  messaggio: string;

  operazioni: ButtonsConfig[] = [{
    text: 'edit',
    customCssClass: 'btn btn-secondary btn-sm',
    icon: '',
  },
  {
    text: 'delete',
    customCssClass: 'btn btn-danger btn-sm',
    icon: '',
  }
  ];

  // creo la key e la label per i veicoli
  headerVehi = [
    { key: 'id', label: 'Id' },
    { key: 'casaCostruttrice', label: 'CasaCostruttrice' },
    { key: 'modello', label: 'Modello' },
    { key: 'annoImmatricolazione', label: 'AnnoImmatricolazione' },
    { key: 'targa', label: 'Targa' },
    { key: 'tipologia', label: 'Tipologia Veicolo' },

  ];

  // settaggio dati mockati 
  // datiVeh = listaVeicoli;

  // settaggio orderConfig
  orderConfig: Orders = {
    defaultColumn: 'id',
    orderType: 'asc',
  };

  columnsVeh: Search = {
    columns: ['id', 'casaCostruttrice', 'modello', 'annoImmatricolazione', 'targa', 'tipologia'],
  }

  // configPages
  pagesConfig: Paginations = {
    itemPerPage: 4,
    itemPerPageOptions: [2, 3, 4, 5],
  };

  tables: TablesConfig = {
    headers: this.headerVehi,
    data: '',
    order: this.orderConfig,
    search: this.columnsVeh,
    pagination: this.pagesConfig,
  };

  ngOnInit(): void {

    // get vehicle dal dbmysql alla tabella
    this.vehicleDataService.getVehicles().subscribe(data => this.tables.data = data);

  }

  // prossima implementazione button add - eventEmitter
  // addNewData(){
  //   alert('Stai per aggiungere un nuovo Veicolo!');
  //   this.router.navigate([`${'add/vehicle'}`, { tipo: 2 }]);
  // }

  edit(object: any) {
    alert('Stai per modificare un veicolo...!');
      this.router.navigate([`edit/vehicles/${object.obj.id}`, {tipo: 2}]);

  }

  opSuRiga(object: any) {
    if (object.text === 'edit') {
      this.edit(object);
    }
    else if (object.text === 'delete') {
      if (confirm("Sei sicuro di voler eliminare??")) {
        this.vehicleDataService.delVehicleById(object.obj.id).subscribe();
        alert("Veicolo eliminato con successo");
      }
      this.router.navigate(['/vehicles']);
    }
  }
}

export class ApiMsg {

  constructor(
    public code: string,
    public message: string
  ) { }

}