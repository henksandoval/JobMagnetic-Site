import { Component } from '@angular/core';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';

@Component({
  selector: 'app-early-adopter-header',
  imports: [AppIdDirective],
  template: `
    <header>
      <h1 appId="headerTitle" i18n="@@headerTitle">Early Adopter View</h1>
    </header>
  `
})
export class EarlyAdopterHeaderComponent {}
