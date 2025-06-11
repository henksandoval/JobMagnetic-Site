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
      { key: 'birthday',    label: 'Cumpleaños:',       i18n: '@@birthday' },
      { key: 'website',     label: 'Sitio Web:',        i18n: '@@webSite' },
      { key: 'phoneNumber', label: 'Teléfono:',         i18n: '@@phone' },
      { key: 'city',        label: 'Ciudad:',           i18n: '@@city' },
      { key: 'age',         label: 'Edad:',             i18n: '@@age' },
      { key: 'degree',      label: 'Título:',           i18n: '@@degree' },
      { key: 'email',       label: 'Correo Electrónico:', i18n: '@@email' },
    ];

    return detailsMap
      .map(item => ({
        ...item,
        value: aboutData[item.key as keyof About]
      }))
      .filter(item => item.value && item.value.toString().trim() !== '');
  });
}
