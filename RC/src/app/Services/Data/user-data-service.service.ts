import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from './../../Entities/user/Users';
import { Injectable } from '@angular/core';
import { ApiMsg } from 'src/app/Entities/user/user.component';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  // servono per il collegamento
  server = "localhost";
  port = "4200";
  port2 = "4000";

  constructor(private httpClient:HttpClient) { }

  getUser(){
  return this.httpClient.get<Users[]>(`http://${this.server}:${this.port2}/api/users/views`);
  // http://localhost:4000/api/users/views
  }

  getUtenti(){
    return this.httpClient.get<Users[]>(`http://${this.server}:${this.port2}/api/users/views`);
  }

  getUserById(id: number){
    return this.httpClient.get<Users>(`http://${this.server}:${this.port2}/api/users/users/${id}`);
  }

  delUser(user: Users) {
    return this.httpClient.delete<ApiMsg>(`http://${this.server}:${this.port2}/api/users/elimina/${user.id}`);
  }

  updUser(user: Users) {
    return this.httpClient.put<ApiMsg>(`http://${this.server}:${this.port2}/api/users/modifica/${user.id}`, user);
  }

  insUser(user: Users) {
    return this.httpClient.post<ApiMsg>(`http://${this.server}:${this.port2}/api/users/inserisci`, user);

  }

}