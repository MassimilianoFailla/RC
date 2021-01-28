import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  saluti = 'Benvenuti nel sito Alphashop';
  titolo2 = 'Seleziona gli articoli da acquistare';

  utente = '';
  messaggio = '';

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.utente = this.route.snapshot.params['username'];

  }

  handleError(error) {
    this.messaggio = error.error.message;
  }

  handleResponse(response: Object) {
    this.messaggio = response.toString();
    console.log(this.messaggio);
  }

}
