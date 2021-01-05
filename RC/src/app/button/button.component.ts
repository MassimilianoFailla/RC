import { Component, Input, OnInit } from '@angular/core';
import { ButtonsConfig } from '../Config/ButtonsConfig';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() button: ButtonsConfig;
 
  @Input() ngClass: string;

  constructor() { }

  ngOnInit(): void {
    }

  }
