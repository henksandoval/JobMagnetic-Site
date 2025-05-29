import { Component } from '@angular/core';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { ResumeFormComponent } from './resume-form/resume-form.component';
import { SummaryFormComponent } from './summary-form/summary-form.component';
import { ServiceFormComponent } from './service-form/service-form.component';
import { TestimonialsFormComponent } from './testimonials-form-list/testimonials-form.component';
import { SkillsFormComponent } from './Skills-form/skills-form.component';

@Component({
  selector: 'app-register',
  imports: [
    AppIdDirective,
    ProfileFormComponent,
    ResumeFormComponent,
    SummaryFormComponent,
    SkillsFormComponent,
    ServiceFormComponent,
    TestimonialsFormComponent,
  ],
  template: `
    <app-profile-form appId="profile-component"></app-profile-form>
    <app-resume-form appId="resume-component"></app-resume-form>
    <app-summary-form appId="summary-component"></app-summary-form>
    <app-skills-form appId="skills-component"></app-skills-form>
    <app-service-form appId="service-component"></app-service-form>
    <app-testimonials-form-list appId="testimonials-component"></app-testimonials-form-list>
  `,
})
export class RegisterComponent {}

