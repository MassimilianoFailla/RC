import { Component } from '@angular/core';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RC';
  
  constructor(ngbAlertConfig: NgbAlertConfig) {
    ngbAlertConfig.animation = true;
  }
}
