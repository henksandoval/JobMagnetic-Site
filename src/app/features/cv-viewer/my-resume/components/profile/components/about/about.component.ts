import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { About } from './interfaces/about';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  imports: [NgOptimizedImage, AppIdDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  aboutSet = input<About>();

  public allDetails = computed(() => {
    const aboutData = this.aboutSet();
    if (!aboutData) return [];

    const detailsMap = [
      { key: 'birthday', label: $localize`:@@birthdayLabel:Birthday:` },
      { key: 'website', label: $localize`:@@websiteLabel:Website:` },
      { key: 'phoneNumber', label: $localize`:@@phoneLabel:Phone:` },
      { key: 'city', label: $localize`:@@cityLabel:City:` },
      { key: 'age', label: $localize`:@@ageLabel:Age:` },
      { key: 'degree', label: $localize`:@@degreeLabel:Degree:` },
      { key: 'email', label: $localize`:@@emailLabel:Email:` },
    ];

    return detailsMap
      .map((item) => ({
        ...item,
        value: aboutData[item.key as keyof About],
      }))
      .filter((item) => item.value && item.value.toString().trim() !== '');
  });
}
