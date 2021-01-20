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
  @Input() Ed: number;

  Conferma: string = '';
  Errore: string = '';
  apiMsg: ApiMsg;
  messaggio: string;
  user: Users;
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
    itemPerPage: 4,
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

  refresh() {
    this.router.navigate([`${'/users'}`]);
  }

  edit() {
    alert('Stai per modificare un utente...!');
    this.router.navigate([`${'edit/users'}`, { tipo: 1 }]);
  }

  delete(user: Users) {
    alert("!!! Stai cancellando l'utente!!!");
    this.Conferma = '';
    this.Errore = '';
      this.userDataService.delUser(user).subscribe(
        response => {
          console.log(response);
          this.apiMsg = response;
          this.Conferma = this.apiMsg.message;
          console.log(this.Conferma);
          alert("Utente eliminato con successo!");
          this.router.navigate(['/users']);
        },
        error => {
          this.Errore = error.error.messaggio;
          console.log(this.Errore);
        }
      )
  }

  InsUsr() {
    this.userDataService.getUser().subscribe(data => this.tables.data = data);
  }

  opSuRiga(object: any) {
    if (object.text === 'edit') {
      this.edit();
    }
    else if (object.text === 'delete') {
      this.delete(object);
      this.router.navigate([`${'/users'}`]);
    }
  }
}

export class ApiMsg {

  constructor(
    public code: string,
    public message: string
  ) { }
}
