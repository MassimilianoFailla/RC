import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TablesConfig } from 'src/app/Config/TablesConfig';
import { Users } from 'src/app/Entities/user/Users';
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
  campi: any[]; // per i lable dell'html
  IsModifica = "";

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