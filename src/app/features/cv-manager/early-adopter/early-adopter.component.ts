import { RouterOutlet } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';
import { EarlyAdopterHeaderComponent } from './layouts/header/early-adopter-header.component';

@Component({
  selector: 'app-early-adopter',
  imports: [RouterOutlet, EarlyAdopterHeaderComponent],
  templateUrl: './early-adopter.component.html',
  styleUrl: './early-adopter.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EarlyAdopterComponent {}
