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
declare var $: any;

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {

  constructor(private router: Router, private reservationDataService: ReservationDataService) { }

  conferma: string = '';
  errore: string = '';
  apiMsg: ApiMsg;
  messaggio: string;

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
  },
  ];

  headerRes = [
        { key: 'id', label: 'ID Prenotazione'},
        { key: 'dataInizio', label: 'Data Inizio Prenotazione'},
        { key: 'dataFine', label: 'Data Fine Prenotazione'},
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
    columns: ['id', 'dataInizio', 'dataFine', 'approvazione'],
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
      this.router.navigate([`edit/reservations/${object.obj.id}`, {tipo: 3}]);
  }

  info(object: any){
    alert("INFO PRENOTAZIONE " +`\n\nID -> ${object.obj.id}` +`\nData Inizio Prenotazione -> ${object.obj.dataInizio}` 
    +`\nData Fine Prenotazione -> ${object.obj.dataFine}` +`\nTarga Veicolo Prenotato -> ${object.obj.veicolo.targa}`
    +`\nModello Veicolo Prenotato -> ${object.obj.veicolo.modello}` +`\nID Utente Prenotazione -> ${object.obj.utente.id}`
    +`\nCodice Fiscale Utente -> ${object.obj.utente.codiceFiscale}`);
  }

  opSuRiga(object: any) {
    if (object.text === 'edit') {
      this.edit(object);
    }
    if (object.text === 'delete') {
      if (confirm("Sei sicuro di voler eliminare??")) {
        this.reservationDataService.delReservationById(object.obj.id).subscribe();
        alert("Prenotazione eliminata con successo");
      }
      this.router.navigate(['/reservations']);
    }
    if(object.text === 'info'){
      this.info(object);
    }
  }

}

export class ApiMsg {
  constructor(
    public code: string,
    public message: string
  ) {}
  
}