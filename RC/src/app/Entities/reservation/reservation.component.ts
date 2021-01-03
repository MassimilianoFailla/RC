import { Input, Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Actions } from 'src/app/Config/Actions';
import { ButtonsConfig } from 'src/app/Config/ButtonsConfig';
import { Orders } from 'src/app/Config/Orders';
import { Paginations } from 'src/app/Config/Paginations';
import { Search } from 'src/app/Config/Search';
import { TablesConfig } from 'src/app/Config/TablesConfig';
import { listaPrenotazioni } from 'src/app/Mock/mock-reservations';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {


  @Input() tabVeh: TablesConfig;
  @Input() datiReservations = listaPrenotazioni;
  @Input() headersReservations: Headers[]
  @Output() operation = new EventEmitter<number>();

  // configurazione bottone
  buttonConfig1: ButtonsConfig = {
    text: 'clicca',
    icon: 'home',
    customCssClass: 'myStyle',
  };

  // creo la key e la label per i veicoli
  headerReser = [
    { key: 'id', label: 'Id' },
    { key: 'dataInizio', label: 'DataInizio' },
    { key: 'dataFine', label: 'DataFine' },
  ];

  // settaggio datiConfig
  datiRes = listaPrenotazioni;

  // settaggio orderConfig
  orderConfig: Orders = {
    defaultColumn: 'id',
    orderType: 'asc',
  };

  columnsRes: Search = {
    columns: ['id', 'dataInizio', 'dataFine'],
  }

  // configPages
  pagesConfig: Paginations = {
    itemPerPage: 2,
    itemPerPageOptions: [2, 3, 4, 5],
  };

  // config action
  actionConfig: Actions[] = [Actions.NEW_ROW, Actions.EDIT, Actions.DELETE];

  tables: TablesConfig = {
    headers: this.headerReser,
    data: this.datiRes,
    order: this.orderConfig,
    search: this.columnsRes,
    pagination: this.pagesConfig,
    button: this.buttonConfig1,
    actions: this.actionConfig,
  };


  ngOnInit(): void {
  }

}
