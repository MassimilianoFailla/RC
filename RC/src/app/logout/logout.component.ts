import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private BasicAuth: AuthenticationService) { }

  ngOnInit(): void {
    this.BasicAuth.clearAll();
  }

}
