import { Input, Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from 'src/app/Config/Actions';
import { ButtonsConfig } from 'src/app/Config/ButtonsConfig';
import { Orders } from 'src/app/Config/Orders';
import { Paginations } from 'src/app/Config/Paginations';
import { Search } from 'src/app/Config/Search';
import { TablesConfig } from 'src/app/Config/TablesConfig';
import { listaPrenotazioni } from 'src/app/Mock/mock-reservations';
import { ReservationDataService } from 'src/app/Services/Data/reservation-data-service.service';
import { ReservationService } from 'src/app/Services/Services-Entities/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  constructor(private reservationService: ReservationService, private router: Router,
    private reservationDataService: ReservationDataService) { }


  @Input() tabVeh: TablesConfig;
  @Input() datiReservations = this.InsRes();
  @Input() headersReservations: Headers[]
  @Output() operation = new EventEmitter<number>();
  @Input() adBut: number;

  apiMsg: ApiMsg;
  messaggio: string;

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

  edit(object: any) {
    alert('Stai per modificare un utente...!');
    this.router.navigate([`${'edit/users'}`, { tipo: 1 }]);
    this.reservationDataService.updReservation(object);
  }

  delete(object: any) {
    alert('Sei sicuro di voler cancellare?');
    this.reservationDataService.delReservationById(object);
  }

  opSuRiga(object: any) {
    if (object.text === 'edit') {
      this.edit(object);
    }
    else if (object.text === 'delete') {
      this.delete(object);
    }
  }

  Elimina(id: number) {
    console.log(`Eliminazione utente ${id}`);

    this.reservationDataService.delReservationById(id).subscribe(
      response => {

        this.apiMsg = response;
        this.messaggio = this.apiMsg.message;
        // this.refresh();

      }
    )

  }

  InsRes() {
    this.reservationDataService.getReservations().subscribe(data => this.tables.data = data);
  }

}

export class ApiMsg {

  constructor(
    public code: string,
    public message: string
  ) { }
}