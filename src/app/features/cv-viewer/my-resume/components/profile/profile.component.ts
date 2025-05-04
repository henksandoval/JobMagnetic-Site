import { Component, inject, model } from '@angular/core';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skils/skills.component';
import { SummaryComponent } from './components/summary/summary.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ServicesComponent } from './components/services/services.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProfileService } from '../../services/profile.service';
import { NgIf } from '@angular/common';
import { MenuSection } from '../../layouts/header/interfaces/menu-section';

@Component({
    selector: 'app-profile',
    imports: [
        NgIf,
        AboutComponent,
        SkillsComponent,
        SummaryComponent,
        PortfolioComponent,
        ServicesComponent,
        TestimonialsComponent,
        ContactComponent,
    ],
    templateUrl: './profile.component.html'
})
export class ProfileComponent {
  private readonly profileService: ProfileService = inject(ProfileService);
  profile$ = this.profileService.profile$;
  sections = model<Map<string, MenuSection>>();
}
