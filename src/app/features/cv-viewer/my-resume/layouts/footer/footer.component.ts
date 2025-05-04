import { Component, inject } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-footer',
    imports: [NgClass, AppIdDirective],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private readonly profileService: ProfileService = inject(ProfileService);
  profile$ = this.profileService.profile$;
}
