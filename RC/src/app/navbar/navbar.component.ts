import { Component, OnInit } from '@angular/core';
import { ButtonsConfig } from '../Config/ButtonsConfig';
import { AuthappService } from '../Services/authapp.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public BasicAuth: AuthappService) { }

  buttonHome: ButtonsConfig = {
    text: 'HOME',
    icon: 'home',
    customCssClass: 'btn',
  };

  buttonUser: ButtonsConfig = {
    text: 'UTENTI',
    icon: 'perm_identity',
    customCssClass: 'btn',
  };

  buttonVehicle: ButtonsConfig = {
    text: 'VEICOLI',
    icon: 'directions_car',
    customCssClass: 'btn',
  };

  buttonReservation: ButtonsConfig = {
    text: 'PRENOTAZIONI',
    icon: 'menu_book',
    customCssClass: 'btn',
  };

  ngOnInit(): void {
  }

}
