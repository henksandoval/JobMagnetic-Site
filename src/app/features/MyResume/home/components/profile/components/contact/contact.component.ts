import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Contact } from './interfaces/contact';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';

@Component({
    selector: 'app-contact',
    imports: [NgIf, AsyncPipe, AppIdDirective],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  contactSet = input<Contact>();
}
