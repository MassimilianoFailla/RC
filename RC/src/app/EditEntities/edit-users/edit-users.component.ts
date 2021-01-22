import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiMsg } from 'src/app/Entities/user/user.component';
import { Users } from 'src/app/Entities/user/Users';
import { UserDataService } from 'src/app/Services/Data/user-data-service.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  id: any;
  isModifica2: boolean = false;
  IsModifica: string;
  conferma: string = '';
  errore: string = '';
  apiMsg: ApiMsg;

usersList: Users = {
    id: 0,
    nome: '',
    cognome: '',
    dataNascita: new Date(),
    codiceFiscale: '',
    email: '',
    username: '',
    password: '',
    role: '',
  };

  constructor(private router: Router, private route: ActivatedRoute, private userDataService: UserDataService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');

    this.usersList = new Users();

    // ottengi i dati dell'utente
    if (this.id != -1) {
      this.isModifica2 = true;

      this.userDataService.getUserById(this.id).subscribe(
        response => {
          this.usersList = response;
          console.log(this.usersList);
        },
        error => {
          console.log(error.error.messaggio);
        }
      )
    } else {
      this.isModifica2 = false;
    }
  }

  abort() {
    this.router.navigate(['/users',]);
  }

  salva() {

    this.conferma = '';
    this.errore = '';
      // aggiornamento !!!
      this.userDataService.updUser(this.usersList).subscribe(
        response => {
          console.log(response);
          this.apiMsg = response;
          this.conferma = this.apiMsg.message;
          console.log(this.conferma);
          alert("modifica utente eseguita con successo!");
          this.router.navigate(['/users']);
        },
        error => {
          this.errore = error.error.messaggio;
          console.log(this.errore);
        }
      )
  }
}