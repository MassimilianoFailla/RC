import { Input, Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from 'src/app/Config/Actions';
import { ButtonsConfig } from 'src/app/Config/ButtonsConfig';
import { MyHeaders } from 'src/app/Config/MyHeaders';
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

  @Input() tabUrs: TablesConfig;
  @Input() datiPrenotazione = this.InsRes();
  @Input() headersRes: MyHeaders[];
  @Output() operation = new EventEmitter<number>();

  @Input() adBut: number;
  @Input() Ed: number;

  Conferma: string = '';
  Errore: string = '';
  apiMsg: ApiMsg;
  messaggio: string;

  // operazioni button
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

  addButt: ButtonsConfig[] = [{
    text: 'ADD',
    customCssClass: 'btn btn-secondary btn-sm',
    icon: '',
  }];

  // configurazione bottone
  buttonConfig: ButtonsConfig = {
    text: 'clicca',
    icon: 'home',
    customCssClass: 'myStyle',
  };

  // settaggio headers
  headerUsr = [
    { key: 'id', label: 'Id' },
    { key: 'dataInizio', label: 'DataInizio' },
    { key: 'dataFine', label: 'DataFine' },
  ];

   // settaggio datiConfig
   datiRes = listaPrenotazioni;

   InsRes() {
    this.reservationDataService.getReservations().subscribe(data => this.tables.data = data);
  }
 
  // settaggio orderConfig
  orderConfig: Orders = {
    defaultColumn: 'id',
    orderType: 'asc',
  };

  columnsUrs: Search = {
    columns: ['id', 'dataInizio', 'dataFine'],
  };

  // configPages
  pagesConfig: Paginations = {
    itemPerPage: 2,
    itemPerPageOptions: [2, 3, 4, 5],
  };

  // config action
  actionConfig: Actions[] = [Actions.NEW_ROW, Actions.EDIT, Actions.DELETE];

  // configurazione tabella
  tables: TablesConfig = {
    headers: this.headerUsr,
    button: this.buttonConfig,
    data: this.datiRes,
    order: this.orderConfig,
    search: this.columnsUrs,
    pagination: this.pagesConfig,
    actions: this.actionConfig,
  };

  ngOnInit(): void {
   
  }

  edit(object: any) {
    alert('Stai per modificare una prenotazione...!');
    this.router.navigate([`${'edit/reservations'}`, {tipo: 3}]);
    this.reservationDataService.updReservation(object);
  }

  delete(id: number) {
    alert("!!! Stai cancellando una prenotazione!!!");
    this.Conferma = '';
    this.Errore = '';
      this.reservationDataService.delReservationById(id).subscribe(
        response => {
          console.log(response);
          this.apiMsg = response;
          this.Conferma = this.apiMsg.message;
          console.log(this.Conferma);
          this.router.navigate(['/reservations']);
        },
        error => {
          this.Errore = error.error.messaggio;
          console.log(this.Errore);
        }
      )
  }

  opSuRiga(object: any) {
    if (object.text === 'edit') {
      this.edit(object);
    }
    else if (object.text === 'delete') {
      this.delete(object);
    }
  }
}

export class ApiMsg {

  constructor(
    public code: string,
    public message: string
  ) {}
}
