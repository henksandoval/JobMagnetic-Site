import { Component, effect, inject, Signal, signal, WritableSignal } from '@angular/core';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { DialogTestimonialComponent } from './dialog-testimonial/dialog-testimonial.component';
import { TestimonialCommand } from './interfaces/testimonialCommand';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { Config } from '@core/services/config/interfaces/config';
import { ConfigService } from '@core/services/config/config.service';
import { StateService } from '@core/services/state/state.service';
import { HttpService } from '@core/services/http/http.service';
import { ApiEndpoints } from '@core/constants/api-endpoints';
import { TestimonialStateService } from './services/testimonial-state.service';

@Component({
  selector: 'app-testimonials-form-list',
  imports: [
    AppIdDirective,
    ReactiveFormsModule,
    MatProgressSpinner,
    MatButton,
    MatCard,
    MatIcon,
    MatIconButton,
    NgIf,
  ],
  templateUrl: './testimonials-form.component.html',
  styleUrl: './testimonials-form.component.scss',
})
export class TestimonialsFormComponent {
  private readonly configService: Config = inject(ConfigService).getConfig();
  private readonly stateService: StateService = inject(StateService);
  private readonly httpService: HttpService = inject(HttpService);
  private readonly testimonialStateService: TestimonialStateService = inject(TestimonialStateService);
  private readonly TESTIMONIAL_URL_ENDPOINT = new URL(
    ApiEndpoints.profile.testimonial,
    this.configService.apiUrl
  );
  private dialog: MatDialog = inject(MatDialog);
  private testimonialsSignal: WritableSignal<TestimonialCommand[]> = signal([]);

  public readonly testimonialsArray: Signal<TestimonialCommand[]> = this.testimonialsSignal.asReadonly();
  public isSaving = false;

  constructor() {
    this.subscribeToTestimonials();
  }

  private subscribeToTestimonials() {
    effect(() => {
      const newCommand = this.testimonialStateService.testimonialCommand();
      if (newCommand && newCommand.testimonialData) {
        this.testimonialsSignal.update((currentArray) => [...currentArray, newCommand]);
        this.testimonialStateService.clearTestimonialCommand();
      }
    });
  }

  openTestimonialDialog(): void {
    this.dialog.open(DialogTestimonialComponent, {
      width: '800px',
      disableClose: true,
    });
  }

  getInitials(name: string): string {
    if (!name) return '';
    const nameParts = name.trim().split(' ');
    if (nameParts.length === 0 || nameParts[0] === '') return '';
    let initials = nameParts[0].charAt(0);
    if (nameParts.length > 1) {
      initials += nameParts[nameParts.length - 1].charAt(0);
    }
    return initials.toUpperCase();
  }

  onDelete(indexToDelete: number): void {
    this.testimonialsSignal.update((currentTestimonials) =>
      currentTestimonials.filter((_, index) => index !== indexToDelete)
    );
  }

  saveAllTestimonials(): void {
    if (this.isSaving) {
      return;
    }
    this.isSaving = true;
    const currentProfileId = this.stateService.tryGetProfileId();
    if (!currentProfileId) {
      this.isSaving = false;
      return;
    }

    this.httpService
      .post(this.TESTIMONIAL_URL_ENDPOINT, this.testimonialsArray())
      .pipe(
        tap(() => {
          this.isSaving = true;
        }),
        catchError((error) => {
          console.error(error);
          return EMPTY;
        }),
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe();
  }
}
