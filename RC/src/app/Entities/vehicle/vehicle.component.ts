import { VehicleService } from './../../Service/Services-Entities/vehicle.service';
import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Actions } from 'src/app/Config/Actions';
import { ButtonsConfig } from 'src/app/Config/ButtonsConfig';
import { Orders } from 'src/app/Config/Orders';
import { Paginations } from 'src/app/Config/Paginations';
import { Search } from 'src/app/Config/Search';
import { TablesConfig } from 'src/app/Config/TablesConfig';
import { listaVeicoli } from 'src/app/Mock/mock-vehicles';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  constructor(private vehicleService: VehicleService, private router: Router) { }

  @Input() tabVeh: TablesConfig;
  @Input() datiVeicoli = listaVeicoli;
  @Input() headersVeicoli: Headers[]
  @Output() operation = new EventEmitter<number>();

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

  // configurazione bottone
  buttonConfig1: ButtonsConfig = {
    text: 'clicca',
    icon: 'home',
    customCssClass: 'myStyle',
  };

  // creo la key e la label per i veicoli
  headerVehi = [
    { key: 'id', label: 'Id' },
    { key: 'casaCostruttrice', label: 'CasaCostruttrice' },
    { key: 'modello', label: 'Modello' },
    { key: 'annoImmatricolazione', label: 'AnnoImmatricolazione' },
    { key: 'targa', label: 'Targa' },
  ];

  // settaggio datiConfig
  datiVeh = listaVeicoli;

  // settaggio orderConfig
  orderConfig: Orders = {
    defaultColumn: 'id',
    orderType: 'asc',
  };


  columnsVeh: Search = {
    columns: ['id', 'casaCostruttrice', 'modello', 'annoImmatricolazione', 'targa'],
  }

  // configPages
  pagesConfig: Paginations = {
    itemPerPage: 2,
    itemPerPageOptions: [2, 3, 4, 5],
  };

  // config action
  actionConfig: Actions[] = [Actions.NEW_ROW, Actions.EDIT, Actions.DELETE];


  tables: TablesConfig = {
    headers: this.headerVehi,
    data: this.datiVeh,
    order: this.orderConfig,
    search: this.columnsVeh,
    pagination: this.pagesConfig,
    button: this.buttonConfig1,
    actions: this.actionConfig,
  };

  ngOnInit(): void {
  }

  edit(object: any){
    alert('Stai per essere indirizzato...!');
    this.router.navigate([`${'/edit'}`]);
    this.vehicleService.onUpdate(object);
  }

  delete(object: any){
    alert('Sei Sicuro di voler cancellare?');
    this.vehicleService.onDelete(object);
  }

  opButton(op: string) {
    switch (op) {
      case 'Edit':
        this.router.navigateByUrl('edit');
    }
  }

  opSuRiga(object: any) {

  if(object.text === 'edit'){
    this.edit(object);
  }
  else if(object.text === 'delete'){
    this.delete(object);
  }
}
}
