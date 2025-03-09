import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Summary } from './interfaces/summary';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrl: './summary.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AppIdDirective]
})
export class SummaryComponent {
  summarySet = input<Summary>();
}
