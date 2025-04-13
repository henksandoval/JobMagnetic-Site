import { AfterViewInit, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from '../layouts/header/header.component';
import { CoverComponent } from './components/cover/cover.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MENU_SECTIONS } from '../layouts/header/constants';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '@core/services/state/state.service';
import { FooterComponent } from '../layouts/footer/footer.component';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, CoverComponent, FooterComponent, ProfileComponent, AppIdDirective],
  templateUrl: './home.component.html',
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements AfterViewInit {
  activatedRoute = inject(ActivatedRoute);
  stateService = inject(StateService);
  sections = signal(MENU_SECTIONS);

  constructor() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const userName = params.get('username')!;
      this.stateService.userName.set(userName);
    });

    this.loadScript('js/main.js');
  }

  ngAfterViewInit(): void {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }

  private loadStyle(url: string): void {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  }

  private loadScript(src: string): void {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }
}
