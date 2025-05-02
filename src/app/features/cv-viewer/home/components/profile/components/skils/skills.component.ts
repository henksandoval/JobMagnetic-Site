import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SkillSet } from './interfaces/skills';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AppIdDirective]
})
export class SkillsComponent {
  skillSet = input<SkillSet>();
}
