import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Users } from 'src/app/Entities/user/Users';
import { listaUtenti } from 'src/app/Mock/mock-users';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  users: Users[] = listaUtenti;

    constructor() { }
    getUsers(): Observable<Users[]> {
        return of(listaUtenti);
    }

    onGet(){
      return this.users;
    }

    onGetUsers(id: Number){
      return this.users.find(x=>x.id === id);
    }

    onAdd(usersList: Users){
      this.users.push(usersList);
    }

    onDelete(id: Number){
      alert('stai cancellando')
      let usersList = this.users.find(x=>x.id === id);
      let index = this.users.indexOf(usersList, 0);
      this.users.splice(index, 1);
    }

    // onUpdate(usersList: Users){
    //   // alert('sei su modifica');
    //   let oldUsers = this.users.find(x=>x.id === usersList.id);
    //   oldUsers.nome = usersList.nome;
    //   oldUsers.cognome = usersList.cognome;
    //   oldUsers.dataNascita = usersList.dataNascita;
    //   oldUsers.codiceFiscale = usersList.codiceFiscale;
    //   oldUsers.email = usersList.email;
    //   oldUsers.username = usersList.username;
    //   oldUsers.password = usersList.password;
    //   oldUsers.role = usersList.role;
    // }

  }
