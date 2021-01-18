import { TablesConfig } from '../../Config/TablesConfig';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/Entities/user/Users';
import { UserDataService } from 'src/app/Services/Data/user-data-service.service';
import { UserService } from 'src/app/Services/Services-Entities/user.service';
import { ApiMsg } from 'src/app/Entities/user/user.component';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})

export class AddUsersComponent implements OnInit {

  id: number;
  header: string;
  @Input() tables: TablesConfig;
  
  Errore: string = '';
  IsModifica: boolean = false;
  Conferma: string = '';

  apiMsg: ApiMsg;

  // utenti
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

  constructor(private router: Router, private route: ActivatedRoute, private usersService: UserService,
    private userDataService: UserDataService) { }

  ngOnInit(): void {
    
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
    this.userDataService.insUser(usersList).subscribe(
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
    alert("Nuovo utente salvato con successo!");
   this.router.navigate(['/users']);

  }
}
