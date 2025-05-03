import { RouterOutlet } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-early-adopter',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './early-adopter.component.html',
  styleUrl: './early-adopter.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EarlyAdopterComponent {}
