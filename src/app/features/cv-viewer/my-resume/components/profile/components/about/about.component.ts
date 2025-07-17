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

  private readonly defaultImage  = "/img/profile_picture_.jpg";

  public readonly displayImageUrl = computed(() => {
    return this.aboutSet()?.imageUrl || this.defaultImage;
  });


  public allDetails = computed(() => {
    const aboutData = this.aboutSet();
    if (!aboutData) return [];

    const detailsMap = [
      { key: 'birthday', label: $localize`:@@birthday:Birthday:` },
      { key: 'website', label: $localize`:@@website:Website:` },
      { key: 'phoneNumber', label: $localize`:@@phone:Phone:` },
      { key: 'city', label: $localize`:@@city:City:` },
      { key: 'age', label: $localize`:@@age:Age:` },
      { key: 'degree', label: $localize`:@@degree:Degree:` },
      { key: 'email', label: $localize`:@@email:Email:` },
    ];

    return detailsMap
      .map((item) => ({
        ...item,
        value: aboutData[item.key as keyof About],
      }))
      .filter((item) => item.value && item.value.toString().trim() !== '');
  });
}
