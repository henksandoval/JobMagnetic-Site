import { Component, inject, OnInit } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkExperience } from '../interfaces/work-experience';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { Guid } from 'guid-typescript';
import { ENTER } from '@angular/cdk/keycodes';
import { MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRow } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-work-experience-dialog',
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
    MatIcon,
    MatChipRow,
    MatChipGrid,
    MatChipInput
  ],
  templateUrl: './work-experience-dialog.component.html',
  styleUrl: './work-experience-dialog.component.scss',
})
export class WorkExperienceDialogComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private dialogRef: MatDialogRef<WorkExperienceDialogComponent> = inject(MatDialogRef);
  readonly separatorKeysCodes: number[] = [ENTER];
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
      responsibilities: this.formBuilder.array([]),
      startDate: ['', [Validators.required]],
      endDate: [''],
    });
  }

  get responsibilitiesFormArray(): FormArray {
    return this.workExperienceForm.get('responsibilities') as FormArray;
  }

  addResponsibility(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const responsibilitiesFormArray = this.workExperienceForm.get('responsibilities') as FormArray;
      responsibilitiesFormArray.push(this.formBuilder.control(value));
      event.chipInput!.clear();
    }
  }

  removeResponsibility(index: number): void {
    this.responsibilitiesFormArray.removeAt(index);
  }

  saveWorkExperience(): void {
    if (this.workExperienceForm.valid) {
      const workExperienceData: WorkExperience = {
        ...this.workExperienceForm.value,
        correlationId: Guid.create().toString(),
      };
      this.dialogRef.close(workExperienceData);
    }
  }
}
