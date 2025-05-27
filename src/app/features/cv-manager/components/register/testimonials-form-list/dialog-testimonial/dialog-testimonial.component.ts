import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {
  MatDialogActions,
  MatDialogClose, MatDialogContent,
  MatDialogRef, MatDialogTitle,
} from '@angular/material/dialog';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-dialog-testimonial',
  imports: [
    ReactiveFormsModule,
    AppIdDirective,
    MatInput,
    MatButton,
    MatDialogClose,
    MatDialogActions,
    MatLabel,
    MatFormField,
    MatDialogContent,
    CdkTextareaAutosize,
    MatDialogTitle,
  ],
  templateUrl: './dialog-testimonial.component.html',
  styleUrl: './dialog-testimonial.component.scss',
})
export class DialogTestimonialComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private dialogRef: MatDialogRef<DialogTestimonialComponent> = inject(MatDialogRef);
  testimonialsDialogForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForms();
  }

  private initializeForms() {
    this.testimonialsDialogForm = this.formBuilder.group({
      name: [''],
      jobTitle: [''],
      photoUrl: [''],
      feedback: [''],
    });
  }

  onAddTestimonials(): void {
    const newTestimonials = this.testimonialsDialogForm.value;
    if (this.testimonialsDialogForm.valid) {
      this.dialogRef.close(newTestimonials);
    }
  }
}
