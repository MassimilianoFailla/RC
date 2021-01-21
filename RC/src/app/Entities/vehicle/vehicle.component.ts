import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Actions } from 'src/app/Config/Actions';
import { ButtonsConfig } from 'src/app/Config/ButtonsConfig';
import { Orders } from 'src/app/Config/Orders';
import { Paginations } from 'src/app/Config/Paginations';
import { Search } from 'src/app/Config/Search';
import { TablesConfig } from 'src/app/Config/TablesConfig';
import { listaVeicoli } from 'src/app/Mock/mock-vehicles';
import { Router } from '@angular/router';
import { VehicleDataService } from 'src/app/Services/Data/vehicle-data-service.service';
import { VehicleService } from 'src/app/Services/Services-Entities/vehicle.service';
import { ApiMsg } from '../user/user.component';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  constructor(private vehicleService: VehicleService, private router: Router,
    private vehicleDataService: VehicleDataService) { }

  @Input() tabVeh: TablesConfig;
  @Input() datiVeicoli = this.InsVeh();
  @Input() headersVeicoli: Headers[]
  @Output() operation = new EventEmitter<number>();
  @Input() adBut: number;
  @Input() upBut: number;
  @Input() delBut: number;
  Conferma: string = '';
  Errore: string = '';
  apiMsg: ApiMsg;
  messaggio: string;

  operazioni: ButtonsConfig[] = [{
    text: 'edit',
    customCssClass: 'btn btn-secondary btn-sm',
    icon: '',
  },
  {
    text: 'delete',
    customCssClass: 'btn btn-danger btn-sm',
    icon: '',
  }
  ];

  // configurazione bottone
  buttonConfig1: ButtonsConfig = {
    text: 'clicca',
    icon: 'home',
    customCssClass: 'myStyle',
  };

  // creo la key e la label per i veicoli
  headerVehi = [
    { key: 'id', label: 'Id' },
    { key: 'casaCostruttrice', label: 'CasaCostruttrice' },
    { key: 'modello', label: 'Modello' },
    { key: 'annoImmatricolazione', label: 'AnnoImmatricolazione' },
    { key: 'targa', label: 'Targa' },
    { key: 'tipologia', label: 'Tipologia' },

  ];

  // settaggio dati mockati 
  // datiVeh = listaVeicoli;

  // settaggio dati DB
  datiVeh = this.InsVeh();


  // settaggio orderConfig
  orderConfig: Orders = {
    defaultColumn: 'id',
    orderType: 'asc',
  };

  columnsVeh: Search = {
    columns: ['id', 'casaCostruttrice', 'modello', 'annoImmatricolazione', 'targa', 'tipologia'],
  }

  // configPages
  pagesConfig: Paginations = {
    itemPerPage: 6,
    itemPerPageOptions: [3, 6, 9, 12],
  };

  tables: TablesConfig = {
    headers: this.headerVehi,
    data: this.datiVeh,
    order: this.orderConfig,
    search: this.columnsVeh,
    pagination: this.pagesConfig,
    button: this.buttonConfig1,
  };

  ngOnInit(): void {

  }

  InsVeh() {
    this.vehicleDataService.getVehicles().subscribe(data => this.tables.data = data);
  }


  delete(id: number) {
    alert("!!! Stai cancellando il veicolo !!!");
    this.Conferma = '';
    this.Errore = '';
    this.vehicleDataService.delVehicleById(id).subscribe(
      response => {
        console.log(response);
        this.apiMsg = response;
        this.Conferma = this.apiMsg.message;
        console.log(this.Conferma);
        this.router.navigate(['/vehicles']);
      },
      error => {
        this.Errore = error.error.messaggio;
        console.log(this.Errore);
      }
    )
  }
}
