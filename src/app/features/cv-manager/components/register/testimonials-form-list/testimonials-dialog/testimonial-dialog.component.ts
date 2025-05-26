import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-testimonials-dialog',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatDialogClose,
  ],
  templateUrl: './testimonial-dialog.component.html',
  styleUrl: './testimonial-dialog.component.scss',
})
export class TestimonialsDialogComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private dialogRef: MatDialogRef<TestimonialsDialogComponent> = inject(MatDialogRef);
  testimonialsDialogForm!: FormGroup;
  isEditMode = false;

  ngOnInit(): void {
    this.initializeForms();
  }

  private initializeForms() {
    this.testimonialsDialogForm = this.formBuilder.group({
      name: [],
      jobTitle: [],
      photoUrl: [],
      feedback: [],
    });
  }

  onSave(): void {
    if (this.testimonialsDialogForm.valid) {
      this.dialogRef.close(this.testimonialsDialogForm.value);
    } else {
      // Marcar campos como tocados para mostrar errores si es necesario
      this.testimonialsDialogForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
