import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actions } from 'src/app/Config/Actions';
import { ButtonsConfig } from 'src/app/Config/ButtonsConfig';
import { Orders } from 'src/app/Config/Orders';
import { Paginations } from 'src/app/Config/Paginations';
import { Search } from 'src/app/Config/Search';
import { TablesConfig } from 'src/app/Config/TablesConfig';
import { listaUtenti } from 'src/app/Mock/mock-users';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  @Input() tabUrs: TablesConfig;
  @Input() datiUtenti = listaUtenti;
  @Input() headersUrs: Headers[];
  @Output() operation = new EventEmitter<number>();

  // configurazione bottone
  buttonConfig: ButtonsConfig = {
    text: 'clicca',
    icon: 'home',
    customCssClass: 'myStyle',
  };

  // settaggio headers
  headerUsr = [
    { key: 'id', label: 'Id' },
    { key: 'nome', label: 'Nome' },
    { key: 'cognome', label: 'Cognome' },
    { key: 'dataNascita', label: 'DataNascita' },
    { key: 'codiceFiscale', label: 'CodiceFiscale' },
    { key: 'email', label: 'Email' },
    { key: 'username', label: 'Username' },
    { key: 'password', label: 'Password' },
    { key: 'role', label: 'role' },
  ];

  // settaggio datiConfig
  datiUsr = listaUtenti;

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
    itemPerPage: 2,
    itemPerPageOptions: [2, 3, 4, 5],
  };

  // config action
  actionConfig: Actions[] = [Actions.NEW_ROW, Actions.EDIT, Actions.DELETE];

  // configurazione tabella
  tables: TablesConfig = {
    headers: this.headerUsr,
    button: this.buttonConfig,
    data: this.datiUsr,
    order: this.orderConfig,
    search: this.columnsUrs,
    pagination: this.pagesConfig,
    actions: this.actionConfig,
  };

  ngOnInit(): void {
  }

}
