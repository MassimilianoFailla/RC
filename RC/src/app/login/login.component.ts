import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  autenticato = true
  errorMsg = 'Spiacente, la username o la password sono errati!'
  autMsg = 'Login effettuato con successo'

  constructor(private route : Router, private auth: AuthenticationService ) { }

  ngOnInit() {
  }

  gestAut() {

    this.auth.authenticate(this.username, this.password)
      .subscribe(
        data => {
          console.log(data);
          this.autenticato = true;
          this.route.navigate(['home/', this.username]);
        },
        error => {
          console.log(error);
          this.autenticato = false;
        }
      )
  }
}
