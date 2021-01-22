// import { Users } from 'src/app/Entities/user/Users';
import { Input, Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonsConfig } from 'src/app/Config/ButtonsConfig';
import { MyHeaders } from 'src/app/Config/MyHeaders';
import { Orders } from 'src/app/Config/Orders';
import { Paginations } from 'src/app/Config/Paginations';
import { Search } from 'src/app/Config/Search';
import { TablesConfig } from 'src/app/Config/TablesConfig';
import { ReservationDataService } from 'src/app/Services/Data/reservation-data-service.service';
import * as _ from 'lodash-es';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class ReservationComponent implements OnInit {

  constructor(private router: Router, private reservationDataService: ReservationDataService) { }

  @Output() operation = new EventEmitter<number>();
  @Input() adBut: number;

  conferma: string = '';
  errore: string = '';
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

  headerRes = [
        { key: 'id', label: 'ID Prenotazione'},
        { key: 'dataInizio', label: 'Data Inizio Prenotazione'},
        { key: 'dataFine', label: 'Data Fine Prenotazione'},
        { key: 'idUtente', label: 'ID Utente'},
        { key: 'cognomeUtente', label: 'Cognome Utente'},
        { key: 'modelloVeicolo', label: 'Modello Veicolo Prenotato'},
        { key: 'targaVeicolo', label: 'Targa Veicolo Prenotato'},
        { key: 'approvazione', label: 'Approvazione' },
    
      ];

   // settaggio dati mockati
  //  datiRes = listaPrenotazioni;

  ngOnInit(): void {

    // get reservation dal dbmysql alla tabella
    this.reservationDataService.getReservations().subscribe(data => this.tables.data = data);

  }

  // settaggio orderConfig
  orderConfig: Orders = {
    defaultColumn: 'id',
    orderType: 'asc',
  };

  columnsUrs: Search = {
    columns: ['id', 'dataInizio', 'dataFine', 'idUtente', 'cognomeUtente', 'modelloVeicolo', 'targaVeicolo', 'approvazione'],
  };

  // configPages
  pagesConfig: Paginations = {
    itemPerPage: 4,
    itemPerPageOptions: [2, 3, 4, 5],
  };

  // configurazione tabella
  tables: TablesConfig = {
    headers: this.headerRes,
    data: '',
    order: this.orderConfig,
    search: this.columnsUrs,
    pagination: this.pagesConfig,

  };

  // prossima implementazione button add
  // addNewData(){
  //   alert('Stai per aggiungere una nuova Prenotazione!');
  //   this.router.navigate([`${'add/reservation'}`, { tipo: 3 }]);
  // }

  edit(object: any) {
    alert('Stai per modificare una prenotazione...!');
    this.router.navigate([`${'edit/reservations'}`, {tipo: 3}]);
    this.reservationDataService.updReservation(object);
  }

  delete(id: number) {
    alert("!!! Stai cancellando una prenotazione!!!");
    this.conferma = '';
    this.errore = '';
      this.reservationDataService.delReservationById(id).subscribe(
        response => {
          console.log(response);
          this.apiMsg = response;
          this.conferma = this.apiMsg.message;
          console.log(this.conferma);
          this.router.navigate(['/reservations']);
        },
        error => {
          this.errore = error.error.messaggio;
          console.log(this.errore);
        }
      )
  }

  opSuRiga(object: any) {
    if (object.text === 'edit') {
      this.edit(object);
    }
    else if (object.text === 'delete') {
      this.reservationDataService.delReservationById(object.obj.id).subscribe();
      alert("Prenotazione eliminato con successo");
      this.router.navigate(['/reservations']);
    }
  }
}

export class ApiMsg {
  constructor(
    public code: string,
    public message: string
  ) {}
  
}