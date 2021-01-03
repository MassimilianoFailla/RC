import { Component, OnInit, Input } from '@angular/core';
import { ButtonsConfig } from '../Config/ButtonsConfig';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent implements OnInit {

  @Input() Titolo: string
  @Input() SottoTitolo: string
  @Input() Show: boolean = true

  @Input() buttonLogin: ButtonsConfig = {
    text: 'Login',
    customCssClass: 'btn btn-primary btn-sm',
    icon: 'input',
  }

  @Input() buttonRegister: ButtonsConfig = {
    text: 'Register',
    customCssClass: 'btn btn-primary btn-sm',
    icon: 'library_books',
  }

  constructor() { }

  ngOnInit(): void {
  }

}
