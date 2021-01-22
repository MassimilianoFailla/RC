import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonsConfig } from 'src/app/Config/ButtonsConfig';
import { Orders } from 'src/app/Config/Orders';
import { Paginations } from 'src/app/Config/Paginations';
import { Search } from 'src/app/Config/Search';
import { TablesConfig } from 'src/app/Config/TablesConfig';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/Services/Data/user-data-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 
  constructor(private router: Router, private userDataService: UserDataService) { }

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

  // configurazione tabella
  tables: TablesConfig = {

    headers: this.headerUsr,
    data: '',
    order: this.orderConfig,
    search: this.columnsUrs,
    pagination: this.pagesConfig,

  };

  ngOnInit(): void {

    // get utenti dal dbmysql alla tabella
    this.userDataService.getUser().subscribe(data => this.tables.data = data);

  }

  //  prossima implementazione button add eventEmitter
  // addNewData(){
  //   alert('Stai per aggiungere un nuovo Utente!');
  //   this.router.navigate([`${'add/user'}`, { tipo: 1 }]);
  // }

  edit() {
    alert('Stai per modificare un utente...!');
    this.router.navigate([`${'edit/users'}`, { tipo: 1 }]);
  }

  delete(id: number) {
    alert("!!! Stai cancellando l'utente!!!");
    this.conferma = '';
    this.errore = '';
      this.userDataService.delUser(id).subscribe(
        response => {
          console.log(response);
          this.apiMsg = response;
          this.conferma = this.apiMsg.message;
          console.log(this.conferma);
          this.router.navigate(['/users']);
        },
        error => {
          this.errore = error.error.messaggio;
          console.log(this.errore);
        }
      )
  }

  opSuRiga(object: any) {
    if (object.text === 'edit') {
      this.edit();
    }
    else if (object.text === 'delete') {
      this.userDataService.delUser(object.obj.id).subscribe();
      alert("Utente eliminato con successo");
      this.router.navigate(['/users']);
    }
  }

}

export class ApiMsg {

  constructor(
    public code: string,
    public message: string
  ) { }
  
}