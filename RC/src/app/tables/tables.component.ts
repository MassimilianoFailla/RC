import { AddComponent } from './../add/add.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TablesConfig } from '../Config/TablesConfig';
import * as _ from 'lodash-es';
import { ButtonsConfig } from '../Config/ButtonsConfig';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';
declare var $: any;

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthenticationService) { }

  // unica configurazione tabella
  @Input() tables: TablesConfig;

  @Input() gestRighe: ButtonsConfig[];    // operazione riga per la tabella
  @Input() addElement: ButtonsConfig;
  @Output() operation = new EventEmitter<string>(); // event emitter button
  @Output() opRiga = new EventEmitter<any>();     // event emitter per riga
  @Output() addComp = new EventEmitter<any>();  // event emitter per l'aggiunta
  logoutUsr = new EventEmitter<any>();    // event emitter per il logout

  @Input() editButton: number;  // numerazione edit butt

  @Input() logoutButton: ButtonsConfig = {
    text: 'Logout',
    customCssClass: 'btn btn-outline-secondary btn-sm',
    icon: '',
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

  logout(object: any) {
    // per il logout
    this.authService.clearAll();
    this.router.navigate(['home']);
  }

  // gestione operazione di aggiunta di un nuovo elemento all'interno della tabella
  aggiunta(addComp: any, object: any) {
    this.tempOB = object;
    this.tempOP = addComp.text;
    if (addComp.ref) {
      $(addComp.ref).modal('show');
    } else {
      this.addComp.emit({ text: addComp.text, obj: object });
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