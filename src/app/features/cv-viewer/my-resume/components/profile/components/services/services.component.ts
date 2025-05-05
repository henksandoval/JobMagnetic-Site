import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Service } from './interfaces/service';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppIdDirective],
})
export class ServicesComponent {
  serviceSet = input<Service>();
}
