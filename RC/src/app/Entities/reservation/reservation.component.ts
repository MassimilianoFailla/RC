// import { Users } from 'src/app/Entities/user/Users';
import { Input, Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from 'src/app/Config/Actions';
import { ButtonsConfig } from 'src/app/Config/ButtonsConfig';
import { MyHeaders } from 'src/app/Config/MyHeaders';
import { Orders } from 'src/app/Config/Orders';
import { Paginations } from 'src/app/Config/Paginations';
import { Search } from 'src/app/Config/Search';
import { TablesConfig } from 'src/app/Config/TablesConfig';
import { ReservationDataService } from 'src/app/Services/Data/reservation-data-service.service';
import { ReservationService } from 'src/app/Services/Services-Entities/reservation.service';
import { Reservations } from './Reservations';
import { Vehicles } from '../vehicle/Vehicles';
import { Users } from '../user/Users';
import * as _ from 'lodash-es';
declare var $: any;

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

//   reservations: Reservations;

//   constructor(private reservationService: ReservationService, private router: Router,
//     private reservationDataService: ReservationDataService) { }

//   @Input() tabRes: TablesConfig;
//   // @Input() datiPrenotazione = this.InsRes();
//   @Input() headersRes: MyHeaders[];
//   @Output() operation = new EventEmitter<number>();

//   @Input() adBut: number;
//   @Input() Ed: number;
//   @Input() utente: Users;
//   @Input() veicolo: Vehicles;
//   Conferma: string = '';
//   Errore: string = '';
//   apiMsg: ApiMsg;
//   messaggio: string;


    
//   reservations2: any;
//   // operazioni button
//   operazioni: ButtonsConfig[] = [{
//     text: 'edit',
//     customCssClass: 'btn btn-secondary btn-sm',
//     icon: '',
//   },
//   {
//     text: 'delete',
//     customCssClass: 'btn btn-danger btn-sm',
//     icon: '',
//   }
//   ];

//   addButt: ButtonsConfig[] = [{
//     text: 'ADD',
//     customCssClass: 'btn btn-secondary btn-sm',
//     icon: '',
//   }];

//   // configurazione bottone
//   buttonConfig: ButtonsConfig = {
//     text: 'clicca',
//     icon: 'home',
//     customCssClass: 'myStyle',
//   };

//   // settaggio headers
//   headerRes = [
//     { key: 'id', label: 'ID Prenotazione'},
//     { key: 'dataInizio', label: 'Data Inizio Prenotazione'},
//     { key: 'dataFine', label: 'Data Fine Prenotazione'},
//     { key: 'utente', label: 'ID Utente' },
//     { key: 'utente', label: 'Cognome Utente'},
//     { key: 'veicolo', label: 'Modello Veicolo Prenotato'},
//     { key: 'veicolo', label: 'Targa Veicolo Prenotato'},
//     { key: 'approvazione', label: 'Approvazione' },

//   ];

//   // settaggio dati mockati
//   //  datiRes = listaPrenotazioni;

//   datiRes =  this.InsRes();

//   InsRes() {

//     // this.reservationDataService.getReservations().subscribe(data => this.reservations2 = data);
//     this.reservationDataService.getReservations().subscribe(data => this.tables.data = data);
    
//   }

//   // settaggio orderConfig
//   orderConfig: Orders = {
//     defaultColumn: 'id',
//     orderType: 'asc',
//   };

//   columnsUrs: Search = {
//     columns: ['id', 'dataInizio', 'dataFine', 'utente', 'veicolo', 'approvazione'],
//   };

//   // configPages
//   pagesConfig: Paginations = {
//     itemPerPage: 8,
//     itemPerPageOptions: [2, 4, 6, 8],
//   };

//   // config action
//   actionConfig: Actions[] = [Actions.NEW_ROW, Actions.EDIT, Actions.DELETE];

//   // configurazione tabella
//   tables: TablesConfig = {
//     headers: this.headerRes,
//     button: this.buttonConfig,
//     data: this.datiRes,
//     order: this.orderConfig,
//     search: this.columnsUrs,
//     pagination: this.pagesConfig,
//     actions: this.actionConfig,
//   };

//   ngOnInit(): void {

//   }

//   edit(reservations: Reservations) {
//     alert('Stai per modificare una prenotazione...!');
//     this.router.navigate([`${'edit/reservations'}`, { reservations }]);
//     this.reservationDataService.updReservation(reservations);
//   }

//   delete(reservations: Reservations) {
//     alert("!!! Stai cancellando una prenotazione!!!");
//     this.Conferma = '';
//     this.Errore = '';
//     this.reservationDataService.delReservationById(reservations.id).subscribe(
//       response => {
//         console.log(response);
//         this.apiMsg = response;
//         this.Conferma = this.apiMsg.message;
//         console.log(this.Conferma);
//         this.router.navigate(['/reservations']);
//       },
//       error => {
//         this.Errore = error.error.messaggio;
//         console.log(this.Errore);
//       }
//     )
//   }

//   opSuRiga(object: any) {
//     if (object.text === 'edit') {
//       this.edit(this.reservation);
//     }
//     else if (object.text === 'delete') {
//       this.delete(this.reservations);
//     }
//   }
// }

// export class ApiMsg {

//   constructor(
//     public code: string,
//     public message: string
//   ) { }

constructor(private route: ActivatedRoute, private router: Router, private resDataService: ReservationDataService) { }

  @Input() tabUrs: TablesConfig;
  @Input() datiRes = this.InsRes();   // dati dal db mysql
  @Input() headersUrs: Headers[];
  @Output() operation = new EventEmitter<number>();
  @Input() adBut: number;
  @Input() Ed: number;

  Conferma: string = '';
  Errore: string = '';
  apiMsg: ApiMsg;
  messaggio: string;
  reservation: Reservations = {
    id: 0, 
    dataInizio: new Date(),
    dataFine: new Date(),
    utente: new Users(),
    veicolo: new Vehicles(),
    approvazione: false,
  };


  // operazioni button
  operazioni: ButtonsConfig[] = [
    {
      text: 'info',
      customCssClass: 'btn btn-info btn-sm',
      icon: '',
    },
    {
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
  headerRes = [
    { key: 'id', label: 'ID Prenotazione' },
    { key: 'dataInizio', label: 'Data Inizio Prenotazione' },
    { key: 'dataFine', label: 'Data Fine Prenotazione' },
    // { key: 'utente', label: 'ID Utente Prenotazione' },
    // { key: 'utente' , label: 'Cognome Utente Prenotazione' },
    // { key: 'veicolo', label: 'Modello Veicolo Prenotato' },
    // { key: 'veicolo', label: 'Targa Veicolo Prenotato' },
    { key: 'approvazione', label: 'Approvazione' },
  ];

  // settaggio dati dal dbmysql
  datiRese = this.InsRes();

  // settaggio orderConfig
  orderConfig: Orders = {
    defaultColumn: 'id',
    orderType: 'asc',
  };

  columnsUrs: Search = {
    columns: ['id', 'nome', 'cognome', 'dataNascita', 'codiceFiscale', 'email', 'username', 'password', 'role'],
  };

  // configPages
  pagesConfig: Paginations = {
    itemPerPage: 8,
    itemPerPageOptions: [2, 3, 4, 5],
  };

  // config action
  actionConfig: Actions[] = [Actions.NEW_ROW, Actions.EDIT, Actions.DELETE];

  // configurazione tabella
  tables: TablesConfig = {
    headers: this.headerRes,
    button: this.buttonConfig,
    data: this.datiRese,
    order: this.orderConfig,
    search: this.columnsUrs,
    pagination: this.pagesConfig,
    actions: this.actionConfig,
  };

  ngOnInit(): void {

  }

  refresh() {
    this.router.navigate([`${'/reservations'}`]);
  }

  edit() {
    alert('Stai per modificare una prenotazione...!');
    this.router.navigate([`${'edit/reservations'}`, { tipo: 3 }]);
  }

  delete(id: Number) {
    alert("!!! Stai cancellando la prenotazione!!!");
    this.Conferma = '';
    this.Errore = '';
      this.resDataService.delReservationById(this.reservation.id).subscribe(
        response => {
          console.log(response);
          this.apiMsg = response;
          this.Conferma = this.apiMsg.message;
          console.log(this.Conferma);
          alert("Prenotazione eliminata con successo!");
          this.router.navigate(['/reservations']);
        },
        error => {
          this.Errore = error.error.messaggio;
          console.log(this.Errore);
        }
      )
  }

  info(){
    alert("non ho ancora inmplementato questo button");
  }

  InsRes() {
    this.resDataService.getReservations().subscribe(data => this.tables.data = data);
  }

  opSuRiga(object: any) {
    if (object.text === 'edit') {
      this.edit();
    }
    if (object.text === 'delete') {
      this.delete(object);
      this.router.navigate([`${'/reservations'}`]);
    }
    if(object.text === 'info'){
      this.info();
    }
  }
}

export class ApiMsg {

  constructor(
    public code: string,
    public message: string
  ) { }
}