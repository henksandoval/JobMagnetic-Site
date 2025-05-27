import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TestimonialData } from './interfaces/TestimonialData';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { DialogTestimonialComponent } from './dialog-testimonial/dialog-testimonial.component';

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
  private formBuilder: FormBuilder = inject(FormBuilder);
  private dialog: MatDialog = inject(MatDialog);
  private testimonialsSignal: WritableSignal<TestimonialData[]> = signal([]);
  public readonly testimonialsArray: Signal<TestimonialData[]> = this.testimonialsSignal.asReadonly();

  isSaving = false;

  openTestimonialDialog(): void {
    const dialogRef = this.dialog.open(DialogTestimonialComponent, {
      width: '800px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((results: TestimonialData) => {
      if (results) {
        this.testimonialsSignal.update((currentArray) => {
          return [...currentArray, results];
        });
        this.addTestimonialToFormArray(results);
      }
    });
  }

  private addTestimonialToFormArray(testimonial: TestimonialData): FormGroup {
    return this.formBuilder.group({
      name: [testimonial.name],
      jobTitle: [testimonial.jobTitle],
      photoUrl: [testimonial.photoUrl],
      feedback: [testimonial.feedback],
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
    // if (indexToDelete >= 0 && indexToDelete < this.testimonialsSignal.length) {
    //   this.testimonialsSignal.(indexToDelete);
    // }
  }

  saveAllTestimonials(): void {
    this.isSaving = true;
  }
}
