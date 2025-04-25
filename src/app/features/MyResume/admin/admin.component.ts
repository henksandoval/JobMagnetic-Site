import { Component } from '@angular/core';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';


@Component({
  selector: 'app-admin',
  imports: [AppIdDirective],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent{
}
