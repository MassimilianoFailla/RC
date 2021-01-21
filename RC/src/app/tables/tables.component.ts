import { listaUtenti } from 'src/app/Mock/mock-users';
import { Actions } from './../Config/Actions';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Paginations } from '../Config/Paginations';
import { Search } from '../Config/Search';
import { TablesConfig } from '../Config/TablesConfig';
import * as _ from 'lodash-es';
import { MyHeaders } from '../Config/MyHeaders';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../Entities/user/Users';
import { listaVeicoli } from '../Mock/mock-vehicles';
import { listaPrenotazioni } from '../Mock/mock-reservations';
import { ButtonsConfig } from '../Config/ButtonsConfig';
import { Vehicles } from '../Entities/vehicle/Vehicles';
import { Reservations } from '../Entities/reservation/Reservations';
import { UserService } from '../Services/Services-Entities/user.service';
import { ReservationDataService } from '../Services/Data/reservation-data-service.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserDataService } from '../Services/Data/user-data-service.service';
import { VehicleDataService } from '../Services/Data/vehicle-data-service.service';
declare var $: any;

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService,
    private rerDataService: ReservationDataService, private usrDataService: UserDataService,
    private vehiDataService: VehicleDataService){}

  @Input() adBut: number; // operazione di aggiunta
  @Input() upBut: number;   // operazione di modifica
  @Input() delBut: number;  // operazione di eliminazione

  closeResult = ''; // modal

  Conferma: string = '';
  Errore: string = '';
  apiMsg: ApiMsg;
  messaggio: string;

  // unica configurazione tabella
  @Input() tables: TablesConfig;

  // input dati entità mockati
  // @Input() datiUsr = listaUtenti;
  // @Input() datiVeh = listaVeicoli;
  // @Input() datiRes = listaPrenotazioni;

  // headers entità
  @Input() headersUrs: MyHeaders[];
  @Input() headersVeh: MyHeaders[];
  @Input() headersRes: MyHeaders[];

  @Input() searchConfig: Search;   // ricerca custom
  @Input() paginationConfig: Paginations;  // per la paginazione

  @Output() provaBut = new EventEmitter<string>();
  @Input() updEl = new EventEmitter<any>();
  @Input() delEl = new EventEmitter<any>();

  @Input() addButt: ButtonsConfig = {
    text: 'new data',
    customCssClass: 'btn btn-secondary btn-sm',
    icon: 'oi oi-plus'
  };

  @Input() delButt: ButtonsConfig = {
    text: 'delete',
    customCssClass: 'btn btn-danger btn-sm',
    icon: ''
  }

  @Input() updButt: ButtonsConfig = {
    text: 'edit',
    customCssClass: 'btn btn-secondary btn-sm',
    icon: '',
  }

  // per le operazioni
  idUsr: number;
  idVeh: number;
  idRes: number;

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

  // componenti
  user: Users;
  vehicle: Vehicles;
  reservations: Reservations;

  // @Output() tipo: number;

  @Output() tipo: number;
  //  new EventEmitter<number>();

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

  addEl(adBut: number) {
    switch (this.adBut) {
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

  updEle(upBut: number){
    switch (this.upBut) {
      case 1:
        alert('Edit Users!');
        this.router.navigate([`${'edit/users'}`, { tipo: 1 }]);
        break;
      case 2:
        alert('Edit Vehicles!');
        this.router.navigate([`${'edit/vehicles'}`, { tipo: 2 }]);
        break;
      case 3:
        alert('Edit Reservation!');
        this.router.navigate([`${'edit/reservations'}`, { tipo: 3 }]);
        break;
      case 0:
        alert('!!! ERROR !!!')
        break;
    }
  }

  deleteUsr(id: number) {
    alert("!!! Stai cancellando l'utente !!!");
    this.Conferma = '';
    this.Errore = '';
    this.usrDataService.delUser(id).subscribe(
      response => {
        console.log(response);
        this.apiMsg = response;
        this.Conferma = this.apiMsg.message;
        console.log(this.Conferma);
        this.router.navigate(['/users']);
      },
      error => {
        this.Errore = error.error.messaggio;
        console.log(this.Errore);
      }
    )
  }
  
  deleteVeh(id: number){
    alert("!!! Stai cancellando il veicolo !!!");
    this.Conferma = '';
    this.Errore = '';
    this.vehiDataService.delVehicleById(id).subscribe(
      response => {
        console.log(response);
        this.apiMsg = response;
        this.Conferma = this.apiMsg.message;
        console.log(this.Conferma);
        this.router.navigate(['/vehicles']);
      },
      error => {
        this.Errore = error.error.messaggio;
        console.log(this.Errore);
      }
    )
  }

  deleteRes(id: number){
    alert("!!! Stai cancellando la prenotazione !!!");
    this.Conferma = '';
    this.Errore = '';
    this.rerDataService.delReservationById(id).subscribe(
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

  delEle(delBut: number, id: number){
    switch (this.delBut) {
      case 1:
        alert('Delete Users!');
       this.deleteUsr(id);
        break;
      case 2:
        alert('Delete Vehicles!');
        this.deleteVeh(id);
        break;
      case 3:
        alert('Delete Reservation!');
        this.deleteRes(id);
        break;
      case 0:
        alert('!!! ERROR !!!')
        break;
    }
  }
}

export class ApiMsg {

  constructor(
    public code: string,
    public message: string
  ) { }
}