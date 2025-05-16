import { Component } from '@angular/core';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { ResumeFormComponent } from './resume-form/resume-form.component';
import { SummaryFormComponent } from './summary-form/summary-form.component';
import { ServiceFormComponent } from './service-form/service-form.component';

@Component({
  selector: 'app-register',
  imports: [AppIdDirective, ProfileFormComponent, ResumeFormComponent, SummaryFormComponent, ServiceFormComponent],
  template: `
    <app-profile-form appId="profile-component"></app-profile-form>
    <app-resume-form appId="resume-component"></app-resume-form>
    <app-summary-form appId="summary-component"></app-summary-form>
    <app-service-form appId="service-component"></app-service-form>
  `,
})
export class RegisterComponent {
}
