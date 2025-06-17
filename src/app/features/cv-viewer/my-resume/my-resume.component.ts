import { AfterViewInit, Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from './layouts/header/header.component';
import { CoverComponent } from './components/cover/cover.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MENU_SECTIONS } from './layouts/header/constants';
import { SECTION_VALIDATORS } from './layouts/section-validators';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '@core/services/state/state.service';
import { FooterComponent } from './layouts/footer/footer.component';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import AOS from 'aos';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-my-resume',
  imports: [HeaderComponent, CoverComponent, FooterComponent, ProfileComponent, AppIdDirective],
  templateUrl: './my-resume.component.html',
  styleUrl: './my-resume.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MyResumeComponent implements AfterViewInit {
  activatedRoute = inject(ActivatedRoute);
  stateService = inject(StateService);
  private profileService = inject(ProfileService);

  constructor() {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug');
    if (slug) {
      this.stateService.slug.set(slug);
      this.profileService.loadProfileBySlug(slug);
    }
  }

  sections = computed(() => {
    const profile = this.profileService.profile$();
    if (!profile) {
      return new Map();
    }

    const filteredEntries = Array.from(MENU_SECTIONS.entries())
      .filter(([key]) => {
        const validator = SECTION_VALIDATORS.get(key);
        return validator ? validator(profile) : false;
      });

    return new Map(filteredEntries);
  });

  ngAfterViewInit(): void {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }
}
