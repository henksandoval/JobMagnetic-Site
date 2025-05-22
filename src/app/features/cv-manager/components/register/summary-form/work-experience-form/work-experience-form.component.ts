import { Component, inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkExperience } from '../interfaces/work-experience';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-work-experience-form',
  imports: [
    AppIdDirective,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatDialogClose,
  ],
  templateUrl: './work-experience-form.component.html',
  styleUrl: './work-experience-form.component.scss',
})
export class WorkExperienceFormComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private dialog: MatDialog = inject(MatDialog);
  workExperienceArray: WorkExperience[] = [];
  workExperienceForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForms();
  }

  private initializeForms() {
    this.workExperienceForm = this.formBuilder.group({
      jobTitle: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      companyLocation: ['', [Validators.required]],
      description: [''],
      responsibilities: [''],
      startDate: ['', [Validators.required]],
      endDate: [''],
    });
  }

  openWorkExperienceDialog(): void {
    const dialogRef = this.dialog.open(WorkExperienceFormComponent, {
      width: '800px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.workExperienceArray.push(result);
      }
    });
  }

  confirmAddWorkExperience(): void {
    if (this.workExperienceForm.valid) {
      const workExperience = this.workExperienceForm.value as WorkExperience;
      workExperience.correlationId = Guid.create();
      this.workExperienceArray.push(workExperience);

      // const workExperiencesArray = this.dataForm.get('workExperiences') as FormArray;
      // workExperiencesArray.push(this.formBuilder.group(workExperience));

      this.workExperienceForm.reset();
    }
  }
}
