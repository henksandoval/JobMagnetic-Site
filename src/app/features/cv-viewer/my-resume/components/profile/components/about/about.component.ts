import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
}
