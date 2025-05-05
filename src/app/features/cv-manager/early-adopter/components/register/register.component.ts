import { Component } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';

@Component({
  selector: 'app-register',
  imports: [ProfileComponent],
  template: `
    <app-profile></app-profile>
  `,
})
export class RegisterComponent {}
