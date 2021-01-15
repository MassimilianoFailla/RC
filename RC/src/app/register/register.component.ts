import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/Entities/user/Users';
import { UserDataService } from 'src/app/Services/Data/user-data-service.service';
import { UserService } from 'src/app/Services/Services-Entities/user.service';
import { TablesConfig } from '../Config/TablesConfig';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  id: number;
  header: string;
  @Input() tables: TablesConfig;

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
      this.usersList = this.usersService.onGetUsers(this.id);
    }
  }

  abort() {
    alert('stai tornando alla tabella degli utenti')
    this.router.navigate(['/users']);
  }

  onSubmit(form: NgForm) {
    let users: Users = {
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
    if (this.id === 0) {
      this.userDataService.insUser(users);
    }
  }

}