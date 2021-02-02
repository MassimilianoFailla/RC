import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonsConfig } from '../Config/ButtonsConfig';
import { Users } from '../Entities/user/Users';
import { AuthenticationService } from '../Services/authentication.service';
import { ReservationDataService } from '../Services/Data/reservation-data-service.service';
import { UserDataService } from '../Services/Data/user-data-service.service';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent implements OnInit {

  @Input() Titolo: string
  @Input() Titolo2: string
  @Input() SottoTitolo: string;
  @Input() Show: boolean = true
  @Input() utente: Users;
  @Output() button: ButtonsConfig;
  @Output() username = '';

  @Input() buttonLogin: ButtonsConfig = {
    text: 'Login',
    customCssClass: 'btn btn-outline-dark btn-sm',
    icon: 'login',
  }

  @Input() buttonLogout: ButtonsConfig = {
    text: 'Logout',
    customCssClass: 'btn btn-outline-dark btn-sm',
    icon: 'logout',
  }

  @Input() buttonRegister: ButtonsConfig = {
    text: 'Register',
    customCssClass: 'btn btn-outline-dark btn-sm',
    icon: 'library_books',
  }

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

  constructor(private router: Router, private userService: UserDataService, private route: ActivatedRoute, 
    private resService: ReservationDataService, private authService: AuthenticationService) { }

    
  ngOnInit(): void {

    this.username = this.route.snapshot.params['username'];
    
   const utenteTr = this.userService.getUserByUsername(this.username).subscribe(
      response =>{
        // this.utente = utenteTr;
        console.log("Utente trovato in jumbotron -> ", response);
      }
    )
  }

  logoutUser(object: any){
    alert("hai cliccato su logout");
    this.authService.clearAll();
    // sessionStorage.removeItem('username')
    this.router.navigate(['/logout']);
  }


  check(){
    this.authService.isUserLoggedIn();
  }

}
