import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actions } from 'src/app/Config/Actions';
import { ButtonsConfig } from 'src/app/Config/ButtonsConfig';
import { Orders } from 'src/app/Config/Orders';
import { Paginations } from 'src/app/Config/Paginations';
import { Search } from 'src/app/Config/Search';
import { TablesConfig } from 'src/app/Config/TablesConfig';
import { listaUtenti } from 'src/app/Mock/mock-users';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from './Users';
import { UserService } from 'src/app/Services/Services-Entities/user.service';
import { UserDataService } from 'src/app/Services/Data/user-data-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private userDataService: UserDataService) { }

  @Input() tabUrs: TablesConfig;
  @Input() datiUtent = this.InsUsr();   // dati dal db mysql
  @Input() headersUrs: Headers[];
  @Output() operation = new EventEmitter<number>();

  @Input() adBut: number;
  @Input() upBut: number;
  @Input() delBut: number;

  Conferma: string = '';
  Errore: string = '';
  apiMsg: ApiMsg;
  messaggio: string;

  // configurazione bottone
  buttonConfig: ButtonsConfig = {
    text: '',
    icon: '',
    customCssClass: '',
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

  // settaggio dati mockati 
  // datiUsr = listaUtenti;

  // settaggio dati dal dbmysql
  datiUsr = this.InsUsr();

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
    itemPerPage: 7,
    itemPerPageOptions: [3, 6, 9, 12],
  };

  // configurazione tabella
  tables: TablesConfig = {
    headers: this.headerUsr,
    button: this.buttonConfig,
    data: this.datiUsr,
    order: this.orderConfig,
    search: this.columnsUrs,
    pagination: this.pagesConfig,
  };

  ngOnInit(): void {

  }

  refresh() {
    this.router.navigate([`${'/users'}`]);
  }

  delete(id: number) {
    console.log(`Eliminazione utente ${4}`);
    this.userDataService.delUser(0).subscribe(
      response => {
        this.apiMsg = response;
        this.messaggio = this.apiMsg.message;
        this.router.navigate([`${'/users'}`]);
      }
    )
  }

  InsUsr() {
    this.userDataService.getUser().subscribe(data => this.tables.data = data);
  }

}

export class ApiMsg {

  constructor(
    public code: string,
    public message: string
  ) { }
}
