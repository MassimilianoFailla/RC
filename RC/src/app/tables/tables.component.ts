import { UserService } from './../Service/Services-Entities/user.service';
import { Actions } from './../Config/Actions';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Paginations } from '../Config/Paginations';
import { Search } from '../Config/Search';
import { TablesConfig } from '../Config/TablesConfig';
import * as _ from 'lodash';
import { MyHeaders } from '../Config/MyHeaders';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../Entities/user/Users';
import { listaUtenti } from '../Mock/mock-users';
import { listaVeicoli } from '../Mock/mock-vehicles';
import { listaPrenotazioni } from '../Mock/mock-reservations';
import { ButtonsConfig } from '../Config/ButtonsConfig';
import { data } from 'jquery';
declare var $: any;


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService){}

  @Input() users: Users[];

  // unica configurazione tabella
  @Input() tables: TablesConfig;

  // input dati entità
  @Input() datiUsr = listaUtenti;
  @Input() datiVeh = listaVeicoli;
  @Input() datiRes = listaPrenotazioni;

  // headers entità
  @Input() headersUrs: Headers[];
  @Input() headersVeh: Headers[];
  @Input() headersRes: MyHeaders[];

  @Input() searchConfig: Search;      // ricerca custom
  @Input() paginationConfig: Paginations;  // per la

  @Output() operation = new EventEmitter<string>();
  @Output() like = new EventEmitter<number>();

  @Input() gestRighe: ButtonsConfig[];
  @Output() opRiga = new EventEmitter<any>();
  @Output() azioni: Actions[];

  // but: ButtonsConfig[] = [{
  //   text: 'clicca',
  //   customCssClass: 'btn btn-secondary btn-sm',
  //   icon: '',
  // },
  // {
  //   text: 'delete',
  //   customCssClass: 'btn btn-secondary btn-sm',
  //   icon: '',
  // }
  // ];

  // @Input() butClick: ButtonsConfig = {
  //   text: 'clicca',
  //   customCssClass: 'btn btn-secondary btn-sm',
  //   icon: '',
  // };

  // @Input() modBut: ButtonsConfig = {
  //   text: 'edit',
  //   customCssClass: 'btn btn-secondary btn-sm',
  //   icon: '',
  // };

  // @Input() addBut: ButtonsConfig = {
  //   text: 'new data',
  //   customCssClass: 'btn btn-secondary btn-sm',
  //   icon: '',
  // }

  // per le operazioni
  idUsr: number;
  idVeh: number;

  headerUs: string;
  headerVe: string;

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

  clicca() {
    alert('hai cliccato clicca!');
  }

  modifica() {
    alert('stai per modificare questo elemento')
    // this.userService.onUpdate(listaUtenti);
  }

  onDelete() {
    alert('hai cliccato onDelete!');
   }

  op(operation: string) {
    this.operation.emit(operation);
  }

  opSuRiga(opriga: any, object: any) {

    // if(this.but.find.name === 'clicca'){
    //   this.userService.onUpdate(data);
    // }
    // if(this.but.text === 'delete'){
    //   this.userService.onDelete(this.idUsr);
    // }
    
    this.tempOB = object;
    this.tempOP = opriga.text;
    if (opriga.ref) {
      $(opriga.ref).modal('show');
    } else {
      this.opRiga.emit({text: opriga.text, obj: object});
    }

  }

  salva(opriga: string, object: any) {
    opriga = this.tempOP;
    object = this.tempOB;

    this.opRiga.emit({opriga, object});
    $('#gestEl').modal('hide');
  }
}