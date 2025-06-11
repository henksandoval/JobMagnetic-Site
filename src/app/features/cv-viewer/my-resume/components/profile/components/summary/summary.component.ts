import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Summary } from './interfaces/summary';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppIdDirective, DatePipe],
})
export class SummaryComponent {
  summarySet = input<Summary>();
  public summary = computed(() => this.summarySet());
  public education = computed(() => this.summary()?.education?.academicBackground);
  public workExperience = computed(() => this.summary()?.workExperience?.position);

  public hasEducation = computed(() => (this.education()?.length ?? 0) > 0);
  public hasWorkExperience = computed(() => (this.workExperience()?.length ?? 0) > 0);
}
