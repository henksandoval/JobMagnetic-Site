import { Component, inject, model } from '@angular/core';
import { HeaderComponent } from '../../shared/layout/header/header.component';
import { CoverComponent } from '../../shared/layout/cover/cover.component';
import { FooterComponent } from '../../shared/layout/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { FactComponent } from './components/fact/fact.component';
import { SkillsComponent } from './components/skills/skills.component';
import { SummaryComponent } from './components/summary/summary.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ServicesComponent } from './components/services/services.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProfileService } from './services/profile.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    HeaderComponent,
    CoverComponent,
    FooterComponent,
    AboutComponent,
    FactComponent,
    SkillsComponent,
    SummaryComponent,
    PortfolioComponent,
    ServicesComponent,
    TestimonialsComponent,
    ContactComponent,
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private readonly profileService: ProfileService = inject(ProfileService);
  profile$ = this.profileService.profile$;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sections = model<any>();
}
