import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Facts } from './facts';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';

@Component({
  selector: 'app-fact',
  standalone: true,
  imports: [NgIf, AsyncPipe, AppIdDirective],
  templateUrl: './fact.component.html',
  styleUrl: 'fact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FactComponent {
  factSet = input<Facts>();
}
