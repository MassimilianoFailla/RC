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

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  // constructor(private router: Router, private route: ActivatedRoute, private userService: UserService){}

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

  @Output() operation = new EventEmitter<number>();

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


  ngOnInit(): void {

    // configurazione dell'ordinamento utenti
    this.orderConfig = this.tables.order.orderType;

    if (this.tables.order.orderType === 'asc' ) {
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

  op(operation: number) {
    this.operation.emit(operation);
  }

}
