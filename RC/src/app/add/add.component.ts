import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationDataService } from '../Services/Data/reservation-data-service.service';
import { UserDataService } from '../Services/Data/user-data-service.service';
import { VehicleDataService } from '../Services/Data/vehicle-data-service.service';
import { ApiMsg } from 'src/app/Entities/user/user.component';
import { Users } from '../Entities/user/Users';
import { Vehicles } from '../Entities/vehicle/Vehicles';
import { Reservations } from '../Entities/reservation/Reservations';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  tipo: number;
  errore: string = '';
  isModifica: boolean = false;
  conferma: string = '';
  form: FormGroup;

  apiMsg: ApiMsg;

  // utenti
  usersList: Users = {
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

  utente: Users; // da inserire dentro reservations
  veicolo: Vehicles;  // da inserire dentro reservations

  listaVeicoli: Vehicles[]; // per trovare la lista dei veicoli

  // veicoli
  vehiclesList: Vehicles = {
    id: 0,
    casaCostruttrice: '',
    annoImmatricolazione: new Date(),
    modello: '',
    targa: '',
    tipologia: '',
  }

  // reservations
  reservationsList: Reservations = {
    id: 0,
    dataInizio: new Date(),
    dataFine: new Date(),
    utente: new Users(0, '', '', new Date(), '', '', '', '', ''),
    veicolo: new Vehicles(0, '', new Date(), '', '', ''),
    approvazione: false,
  };

  constructor(private route: ActivatedRoute, private router: Router, private userDataService: UserDataService, private vehicleDataService: VehicleDataService,
    private reservationDataService: ReservationDataService) { }

  ngOnInit(): void {

    this.tipo = Number(this.route.snapshot.paramMap.get('tipo'));

    if (this.tipo === 3) {
      // Otteniamo i dati dei veicoli 
      this.reservationDataService.getVehicles().subscribe(
        response => {
          this.listaVeicoli = response;
          console.log("Lista veicoli -> ", response);
        },
        error => {
          console.log(error);
        }
      )

      //Otteniamo i dati dell'utente, in questo caso la prova con id 7
      // da implementare la ricerca dell'id dell'utente non appena l'utente si logga
      this.reservationDataService.getUserById(1).subscribe(
        response => {
          this.utente = response;
          console.log("Dati utente -> ", response);
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  abort() {
    alert('stai tornando alla home')
    this.router.navigate(['']);
  }

  onSubmit(form: NgForm) {

    if (this.tipo === 1) {
      let usersList: Users = {
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
      this.userDataService.insUser(usersList).subscribe(
        response => {
          console.log(response);
          this.apiMsg = response;
          this.conferma = this.apiMsg.message;
          console.log(this.conferma);
        },
        error => {
          this.errore = error.error.messaggio;
          console.log(this.errore);
        }
      )
      alert("Nuovo utente salvato con successo!");
      this.router.navigate(['/users']);
    }


    if (this.tipo === 2) {

      let vehicles: Vehicles = {
        id: form.value.id,
        annoImmatricolazione: form.value.annoImmatricolazione,
        casaCostruttrice: form.value.casaCostruttrice,
        modello: form.value.modello,
        targa: form.value.targa,
        tipologia: form.value.tipologia,
      }

      this.vehicleDataService.insVehicle(vehicles).subscribe(
        response => {
          console.log(response);
          this.apiMsg = response;
          this.conferma = this.apiMsg.message;
          console.log(this.conferma);
        },
        error => {
          this.errore = error.error.messaggio;
          console.log(this.errore);
        }
      )
      alert("Nuovo veicolo salvato con successo!");
      this.router.navigate(['/vehicles']);
    }

    if (this.tipo === 3) {

      let reservationsList: Reservations = {
        id: form.value.id,
        dataInizio: form.value.dataInizio,
        dataFine: form.value.dataFine,
        utente: this.utente,
        veicolo: this.veicolo,
        approvazione: form.value.approvazione,
      }
  
      this.reservationDataService.InsReservation(reservationsList).subscribe(
        response => {
          console.log(response);
          this.apiMsg = response;
          this.conferma = this.apiMsg.message;
          console.log(this.conferma);
        },
        error => {
          this.errore = error.error.messaggio;
          console.log(this.errore);
        }
      )
      alert("Nuova prenotazione salvata con successo!");
      this.router.navigate(['/reservations']);
    }
  }
}
