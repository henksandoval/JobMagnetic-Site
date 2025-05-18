import { Component, ViewEncapsulation } from '@angular/core';
import { NavbarComponent } from './layouts/navbar/navbar.component';

@Component({
  selector: 'app-early-adopter',
  imports: [NavbarComponent],
  templateUrl: './early-adopter.component.html',
  styleUrl: './early-adopter.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EarlyAdopterComponent {}
