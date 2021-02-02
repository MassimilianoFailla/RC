import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonsConfig } from '../Config/ButtonsConfig';
import { Users } from '../Entities/user/Users';
import { AuthenticationService } from '../Services/authentication.service';
import { ReservationDataService } from '../Services/Data/reservation-data-service.service';
import { UserDataService } from '../Services/Data/user-data-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private userService: UserDataService, 
    private route: ActivatedRoute, private resService: ReservationDataService, private authService: AuthenticationService) { }

  buttonHome: ButtonsConfig = {
    text: 'Rental Car Home',
    icon: 'home',
    customCssClass: 'btn btn-light btn-sm',
  };

  buttonUser: ButtonsConfig = {
    text: 'Users',
    icon: 'supervisor_account',
    customCssClass: 'btn btn-light btn-sm',
  };

  buttonVehicle: ButtonsConfig = {
    text: 'Vehicles',
    icon: 'bike_scooter',
    customCssClass: 'btn btn-light btn-sm',
  };

  buttonReservation: ButtonsConfig = {
    text: 'Reservations',
    icon: 'menu_book',
    customCssClass: 'btn btn-light btn-sm',
  };

  user: Users = {
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

  username: string;
  
    ngOnInit(): void {

      this.username = this.route.snapshot.params['username'];
      console.log("Username navbar", this.username);
  
      // mi trovo l'utente tramite lo username
      const userTrovato = this.userService.getUserByUsername(this.username).subscribe(
        response => {
          this.user = response;
          console.log("Navbar utente -> ", this.user);
        },
        error => {
          console.log(error.error.messaggio);
        }
      )
    
      }
    }