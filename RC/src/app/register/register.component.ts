import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TablesConfig } from '../Config/TablesConfig';
import { Users } from '../Entities/user/Users';
import { UserService } from '../Service/Services-Entities/user.service';

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

  constructor(private router: Router, private route: ActivatedRoute, private usersService: UserService) { }

  ngOnInit(): void {
    // this.id = +this.route.snapshot.paramMap.get('id');
    // this.header = this.id === 0 ? 'Adding User' : 'Editing User';

    // if (this.id != 0) {
    //   this.usersList = this.usersService.onGetUsers(this.id);
    // }
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
      this.usersService.onAdd(users);
    }
  }
}
