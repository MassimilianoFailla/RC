import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TablesConfig } from '../Config/TablesConfig';
import * as _ from 'lodash-es';
import { ButtonsConfig } from '../Config/ButtonsConfig';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  constructor(private router: Router) { }

  // unica configurazione tabella
  @Input() tables: TablesConfig;

  @Input() gestRighe: ButtonsConfig[];    // operazione riga per la tabella

  @Output() operation = new EventEmitter<string>(); // event emitter button
  @Output() opRiga = new EventEmitter<any>();     // event emitter per riga

  // @Output() opAddButt = new EventEmitter<any>();  // prossima implementazione button add- eventEmitter

  @Input() addButton: number;   // numerazione per l'add butt
  @Input() editButton: number;  // numerazione edit butt

  // configurazione button
  @Input() addButt: ButtonsConfig = {
    text: 'New Data',
    customCssClass: 'btn btn-secondary btn-sm',
    icon: ''
  };

  // per l'ordinamento
  reverse: boolean;
  orderType: string;

  // per la paginazione
  selectedPage: number;
  perPage: number;
  paginPipe: number;

  // per il filraggio
  selectedFilter: string;
  searched: string;
  searchValue: string;

  // per l'ordinamento
  icon: string;
  order: string;
  orderConfig: string;

  tempOP: string;
  tempOB: any;

  ngOnInit(): void {

    // configurazione dell'ordinamento utenti
    this.orderConfig = this.tables.order.orderType;

    if (this.tables.order.orderType === 'asc') {
      this.tables.data = _.orderBy(this.tables.data, [this.tables.order.defaultColumn], ['asc']);
      this.orderConfig = 'asc';
      this.icon = 'arrow_drop_down';
    } else {
      this.tables.data = _.orderBy(this.tables.data, [this.tables.order.defaultColumn], ['desc']);
      this.orderConfig = 'desc';
      this.icon = 'arrow_drop_up';
    }

    // paginazione
    this.perPage = this.tables.pagination.itemPerPage;
    this.selectedPage = 0;
    
  }

  // sorting
  sort(key: string) {
    if (this.orderType === 'desc') {
      this.tables.data = _.orderBy(this.tables.data, [key], ['asc']);
      this.orderType = 'asc';
      this.icon = 'arrow_drop_down';
    } else {
      this.tables.data = _.orderBy(this.tables.data, [key], ['desc']);
      this.icon = 'arrow_drop_up';
      this.orderType = 'desc';
    }
  }

  // per i vari casi di add element, in base al tipo di dato
  addEl(addButton: number) {

    switch (this.addButton) {
      case 1:
        alert('Add Users!');
        this.router.navigate([`${'add/user'}`, { tipo: 1 }]);
        break;
      case 2:
        alert('Add Vehicles!');
        this.router.navigate([`${'add/vehicle'}`, { tipo: 2 }]);
        break;
      case 3:
        alert('Add Reservation!');
        this.router.navigate([`${'add/reservation'}`, { tipo: 3 }]);
        break;
      case 0:
        alert('!!! ERROR !!!')
        break;
    }
  }
  
  // gestione operazione per riga
  opSuRiga(opriga: any, object: any, editButton: number) {
    this.tempOB = object;
    this.tempOP = opriga.text;
    if (opriga.ref) {
      $(opriga.ref).modal('show');
    } else {
      this.opRiga.emit({ text: opriga.text, obj: object });
    }
  }
}