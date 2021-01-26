import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiMsg } from '../Entities/user/user.component';
import { Users } from '../Entities/user/Users';
import { UserDataService } from '../Services/Data/user-data-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errore: string = '';
  isModifica: boolean = false;
  conferma: string = '';
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

  constructor(private route: ActivatedRoute, private router: Router, private userDataService: UserDataService) { }

  ngOnInit(): void {
  }


  abort() {
    alert('stai tornando alla home')
    this.router.navigate(['']);
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
        this.conferma = this.apiMsg.message;
        console.log(this.conferma);
      },
      error => {
        this.errore = error.error.messaggio;
        console.log(this.errore);
      }
    )
    alert("Registrazione nuovo utente salvato con successo!");
    this.router.navigate(['/users']);
  }
}
