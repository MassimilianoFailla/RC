import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalutiDataService {

  // coding injection http
  constructor(private httpClient: HttpClient) { }

  getSaluti(nome: string){
    
    return this.httpClient.get(`http://localhost:8050/api/saluti/${nome}`);
  }
}
