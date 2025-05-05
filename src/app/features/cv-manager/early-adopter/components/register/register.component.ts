import { Component } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';

@Component({
  selector: 'app-register',
  imports: [AppIdDirective, ProfileComponent],
  template: ` <app-profile appId="profile-component"></app-profile> `,
})
export class RegisterComponent {}
