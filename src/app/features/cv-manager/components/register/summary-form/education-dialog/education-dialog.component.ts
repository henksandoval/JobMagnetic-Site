import { Component, inject, OnInit } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Education } from '../interfaces/education';
import { Guid } from 'guid-typescript';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';


@Component({
  selector: 'app-education-dialog',
  imports: [
    MatInput,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    AppIdDirective,
  ],
  templateUrl: './education-dialog.component.html',
  styleUrl: './education-dialog.component.scss',
})
export class EducationDialogComponent  implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private dialogRef: MatDialogRef<EducationDialogComponent > = inject(MatDialogRef);
  educationForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForms();
  }

  private initializeForms() {
    this.educationForm = this.formBuilder.group({
      degree: ['', [Validators.required]],
      institutionName: ['', [Validators.required]],
      institutionLocation: ['', [Validators.required]],
      description: [''],
      startDate: ['', [Validators.required]],
      endDate: [''],
    });
  }

  saveEducation(): void {
    if (this.educationForm.valid) {
      const educationData: Education = {
        ...this.educationForm.value,
        correlationId: Guid.create().toString()
      };
      this.dialogRef.close(educationData);
    }
  }
}
