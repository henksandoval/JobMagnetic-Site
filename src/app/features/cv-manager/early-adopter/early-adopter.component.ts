import { RouterOutlet } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';
import { EarlyAdopterHeaderComponent } from './layouts/header/early-adopter-header.component';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';

@Component({
  selector: 'app-early-adopter',
  imports: [AppIdDirective, RouterOutlet, EarlyAdopterHeaderComponent],
  template: `
    <div class="early-adopter-layout">
      <app-early-adopter-header appId="early-adopter-header"></app-early-adopter-header>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './early-adopter.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EarlyAdopterComponent {}
