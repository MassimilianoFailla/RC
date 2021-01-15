import { SalutiDataService } from './../Service/saluti-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  utente = '';
  message = ''; 

  constructor(private salutiSr: SalutiDataService) { }

  ngOnInit(): void {
  }

  getSaluti(){
    console.log(this.salutiSr.getSaluti(this.utente));
    this.salutiSr.getSaluti(this.utente).subscribe(
      response => this.handleResponse(response));
  }

  handleResponse(response){
    this.message = response;
    console.log(response);
  }

}