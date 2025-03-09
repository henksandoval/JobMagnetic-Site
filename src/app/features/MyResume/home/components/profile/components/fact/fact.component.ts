import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Facts } from './interfaces/facts';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';

@Component({
    selector: 'app-fact',
    imports: [AppIdDirective],
    templateUrl: './fact.component.html',
    styleUrl: 'fact.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FactComponent {
  factSet = input<Facts>();
}
