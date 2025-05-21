import { Component, inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Education } from '../interfaces/education';
import { Guid } from 'guid-typescript';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';


@Component({
  selector: 'app-education-form',
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
  templateUrl: './education-form.component.html',
  styleUrl: './education-form.component.scss',
})
export class EducationFormComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private dialog: MatDialog = inject(MatDialog);
  educationArray: Education[] = [];
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

  openEducationDialog(): void {
    const dialogRef = this.dialog.open(EducationFormComponent, {
      width: '800px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.educationArray.push(result);
      }
    });
  }

  confirmAddEducation(): void {
    if (this.educationForm.valid) {
      const education = this.educationForm.value as Education;
      education.correlationId = Guid.create();
      this.educationArray.push(education);

      // const educationArray = this.dataForm.get('education') as FormArray;
      // educationArray.push(this.formBuilder.group(education));

      this.educationForm.reset();
    }
  }
}
