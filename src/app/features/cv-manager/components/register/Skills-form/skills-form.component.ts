import { Component } from '@angular/core';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';

@Component({
  selector: 'app-skills-form',
  imports: [AppIdDirective],
  templateUrl: './skills-form.component.html',
  styleUrl: './skills-form.component.scss',
})
export class SkillsFormComponent {}
