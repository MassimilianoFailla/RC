import { MyHeaders } from './../Config/MyHeaders';
import { listaPrenotazioni } from './../Mock/mock-reservations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonsConfig } from '../Config/ButtonsConfig';
import { TablesConfig } from '../Config/TablesConfig';
import { Reservations } from '../Entities/reservation/Reservations';
import { Users } from '../Entities/user/Users';
import { ReservationDataService } from '../Services/Data/reservation-data-service.service';
import { UserDataService } from '../Services/Data/user-data-service.service';
import { AuthenticationService } from '../Services/authentication.service';
declare var $: any;

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  saluti = 'Benvenuto nel sito Alphashop: ';
  titolo2 = 'Seleziona gli articoli da acquistare';
  errore: string = '';
  messaggio = '';
  tempOP: string;
  tempOB: any;

  @Input() username = '';
  @Input() table: TablesConfig;
  @Input() headers: MyHeaders;
  @Output() addComp = new EventEmitter<any>();  // event emitter per l'aggiunta
  @Input() addElement: ButtonsConfig;
  @Input() userJumbo: Users;

  
  // operazione di aggiunta, button
  add: ButtonsConfig = {
    text: 'New Reservation',
    customCssClass: 'btn btn-outline-secondary btn-sm',
    icon: '',
  }

  logout: ButtonsConfig = {
    text: 'Logout',
    customCssClass: 'btn btn-outline-secondary btn-sm',
    icon: '',
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

  listaReservations: Reservations[];

  constructor(private router: Router, private userService: UserDataService, private route: ActivatedRoute, 
    private resService: ReservationDataService, private authService: AuthenticationService) { }

  ngOnInit(): void {

    this.username = this.route.snapshot.params['username'];
    console.log(this.username);

    // mi trovo l'utente tramite lo username
    const userTrovato = this.userService.getUserByUsername(this.username).subscribe(
      response => {
        this.user = response;
        console.log("utente -> ", this.user);

        // controllo il ruolo dell'utente
        if(this.user.role === 'Super'){
          console.log("Id utente super -> ", this.user.id)

          // trovo tutte le prenotazioni visualizzabili dall'utente di tipo super
          this.resService.getReservations().subscribe(
            response => {
              this.listaReservations = response;
              console.log("Prenotazioni trovate per l'utente di tipo Suser -> ", this.listaReservations);
            }  
          )
        }
        else {
          // trovo tutte le prenotazioni visualizzabili dall'utente di tipo user tramite il suo id
          this.resService.getReservationsByIdUser(this.user.id).subscribe(
            response => {
              this.listaReservations = response;
              console.log("Id utente user -> ", this.user.id)
              console.log("Prenotazioni trovate per l'utente di tipo User -> ", this.listaReservations);
            }  
          )
        }
      },
      error => {
        console.log(error.error.messaggio);
      }
    )

    // gestire l'utente in sessione

    }

    //  prossima implementazione button add eventEmitter
  addNewData(object: any){
    alert('Stai per aggiungere una nuova prenotazione!');
    this.router.navigate([`${'add/reservation'}`, { tipo: 3 }]);
  }

  aggiuntaNuovaPrenotazione(object: any){
    if(object.text === 'New User'){
      this.addNewData(object);
    }
  }

  logoutUser(object: any){
    this.authService.clearAll();
    alert("Logout effettuato!");
    this.router.navigate(['/home']);

  }

  handleError(error) {
    this.messaggio = error.error.message;
  }

  handleResponse(response: Object) {
    this.messaggio = response.toString();
    console.log(this.messaggio);
  }

  headersResUser = [
    { key: 'id', label: 'ID'},
    { key: 'dataInizio', label: 'Inizio Prenotazione'},
    { key: 'dataFine', label: 'Fine Prenotazione'},
    { key: 'id_utente', label: 'ID Utente'},
    { key: 'approvazione', label: 'Approvazione' },
    {key: 'veicolo', label: ''},

  ];

}