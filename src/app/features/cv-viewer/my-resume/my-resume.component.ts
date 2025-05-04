import { AfterViewInit, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from './layouts/header/header.component';
import { CoverComponent } from './components/cover/cover.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MENU_SECTIONS } from './layouts/header/constants';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '@core/services/state/state.service';
import { FooterComponent } from './layouts/footer/footer.component';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import AOS from 'aos';

@Component({
  selector: 'app-my-resume',
  imports: [HeaderComponent, CoverComponent, FooterComponent, ProfileComponent, AppIdDirective],
  templateUrl: './my-resume.component.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class MyResumeComponent implements AfterViewInit {
  activatedRoute = inject(ActivatedRoute);
  stateService = inject(StateService);
  sections = signal(MENU_SECTIONS);

  constructor() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const userName = params.get('username')!;
      this.stateService.userName.set(userName);
    });
  }

  ngAfterViewInit(): void {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }
}
