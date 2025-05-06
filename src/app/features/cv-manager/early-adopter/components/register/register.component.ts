import { Component } from '@angular/core';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';

@Component({
  selector: 'app-register',
  imports: [AppIdDirective, ProfileFormComponent],
  template: ` <app-profile-form appId="profile-component"></app-profile-form> `,
})
export class RegisterComponent {}
