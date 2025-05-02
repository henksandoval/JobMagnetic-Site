import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-index',
  imports: [AppIdDirective, RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent {}
