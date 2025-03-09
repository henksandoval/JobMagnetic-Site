import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Contact } from './interfaces/contact';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';

@Component({
    selector: 'app-contact',
    imports: [AppIdDirective],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  contactSet = input<Contact>();
}
