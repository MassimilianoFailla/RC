import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TablesConfig } from 'src/app/Config/TablesConfig';
import { ApiMsg } from 'src/app/Entities/user/user.component';
import { Users } from 'src/app/Entities/user/Users';
import { listaUtenti } from 'src/app/Mock/mock-users';
import { UserDataService } from 'src/app/Services/Data/user-data-service.service';
import { UserService } from 'src/app/Services/Services-Entities/user.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  id: number;
  header: string;
  @Input() tables: TablesConfig;
  
  Errore: string = '';
  IsModifica: boolean = false;
  Conferma: string = '';
  IsModifica2: string;
  apiMsg: ApiMsg;


  // utenti
  usersList: Users = {
    id: 0,
    nome: '',
    cognome: '',
    dataNascita: '',
    codiceFiscale: '',
    email: '',
    username: '',
    password: '',
    role: '',
  };

  constructor(private router: Router, private route: ActivatedRoute, private usersService: UserService,
    private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.header = this.id === 0 ? 'Adding User' : 'Editing User';

    if (this.id != 0) {
      // this.usersList = this.usersService.onGetUsers(this.id);
      this.usersList = this.userDataService.getUserById(this.id);
    }
  }

  abort() {
    alert('stai tornando alla tabella degli utenti')
    this.router.navigate(['/users']);
  }

  onSubmit(form: NgForm) {
    let usersList: Users = {
      id: form.value.id,
      nome: form.value.nome,
      cognome: form.value.cognome,
      dataNascita: form.value.dataNascita,
      codiceFiscale: form.value.codiceFiscale,
      email: form.value.email,
      username: form.value.username,
      password: form.value.password,
      role: form.value.role,
    }
  //   }
  //  onSubmit(usersList: Users){
  //     // alert('sei su modifica');
  //     let oldUsers = this.users.find(x=>x.id === usersList.id);
  //     oldUsers.nome = usersList.nome;
  //     oldUsers.cognome = usersList.cognome;
  //     oldUsers.dataNascita = usersList.dataNascita;
  //     oldUsers.codiceFiscale = usersList.codiceFiscale;
  //     oldUsers.email = usersList.email;
  //     oldUsers.username = usersList.username;
  //     oldUsers.password = usersList.password;
  //     oldUsers.role = usersList.role;
    
    alert("stai per modificare l'utente con id .> " +this.id);
    this.userDataService.updUser(usersList).subscribe(
      response => {
        console.log(response);
        this.apiMsg = response;
        this.Conferma = this.apiMsg.message;
        console.log(this.Conferma);
      },
      error => {
        this.Errore = error.error.messaggio;
        console.log(this.Errore);
      }
    )
    alert("Modifica utente salvato con successo!");
   this.router.navigate(['/users']);

  }
}

//   id: number;
//   idUser: number;

//   header: string;
//   @Input() tables: TablesConfig;
//   IsModifica = '';
//   Errore: string = '';
//   Conferma: string = '';
//   apiMsg: ApiMsg;
//   IsModifica2: boolean = false;

//   user: Users;

//   // utenti
//   usersList: Users = {
//     id: 4,
//     nome: 'ciao',
//     cognome: 'ciao',
//     dataNascita: 'ciao',
//     codiceFiscale: 'ciao',
//     email: 'ciao',
//     username: '',
//     password: '',
//     role: '',
//   };



//   constructor(private router: Router, private route: ActivatedRoute, private usersService: UserService,
//     private userDataService: UserDataService) { }

//   ngOnInit(): void {
//     // this.id = this.route.snapshot.paramMap.get('id');
//     this.header = this.id === 0 ? 'Adding page' : 'Editing page';

//     if (this.id != 0) {
//       this.userDataService.updUser(this.usersList).subscribe(
//         response => {
//           console.log(response);
//           this.apiMsg = response;
//           this.Conferma = this.apiMsg.message;
//           console.log(this.Conferma);
//         },
//         error => {
//           this.Errore = error.error.messaggio;
//           console.log(this.Errore);
//         }
//       )
//       alert("Utente modificato con successo!");
//       this.router.navigate(['/users']);
//     }
//     else {
//       this.userDataService.insUser(this.user);
//     }
//   }

//   abort() {
//     alert('stai tornando alla tabella degli utenti')
//     this.router.navigate(['/users']);
//   }

//   onSubmit(form: NgForm) {
//     let users: Users = {
//       id: form.value.id,
//       nome: form.value.nome,
//       cognome: form.value.cognome,
//       dataNascita: form.value.dataNascita,
//       codiceFiscale: form.value.codiceFiscale,
//       email: form.value.email,
//       username: form.value.username,
//       password: form.value.password,
//       role: form.value.role,

//     }
//     if (this.id === 0) {
//       this.userDataService.insUser(users);
//     }
//     else if(this.id != null){
//       this.userDataService.updUser(users).subscribe(
//         response => {
//           console.log(response);
//           this.apiMsg = response;
//           this.Conferma = this.apiMsg.message;
//           console.log(this.Conferma);
//         },
//         error => {
//           this.Errore = error.error.messaggio;
//           console.log(this.Errore);
//         }
//       )
//       alert("Utente modificato con successo!");
//       this.router.navigate(['/users']);

//     }

//   }
// }