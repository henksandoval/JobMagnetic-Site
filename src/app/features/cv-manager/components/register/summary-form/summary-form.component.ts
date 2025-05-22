import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { Education } from './interfaces/education';
import { Guid } from 'guid-typescript';
import { WorkExperience } from './interfaces/work-experience';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { EducationDialogComponent } from './education-dialog/education-dialog.component';

@Component({
  selector: 'app-summary-form',
  imports: [
    ReactiveFormsModule,
    AppIdDirective,
    DatePipe,
    NgIf,
    MatIcon,
    MatButton,
    NgForOf,
    MatCardContent,
    MatCardActions,
    MatCard,
    MatLabel,
    MatFormField,
    MatInput,
    MatProgressSpinner,
    MatIconButton,
  ],
  templateUrl: './summary-form.component.html',
  styleUrl: './summary-form.component.scss',
})
export class SummaryFormComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private dialog: MatDialog = inject(MatDialog);
  dataForm!: FormGroup;
  private educationSignal: WritableSignal<Education[]> = signal([]);
  public readonly educationArray: Signal<Education[]> = this.educationSignal.asReadonly();
  workExperienceArray: WorkExperience[] = [];
  isSaving = false;

  ngOnInit(): void {
    this.initializeForms();
  }

  private initializeForms() {
    this.dataForm = this.formBuilder.group({
      introduction: ['', [Validators.required]],
      education: this.formBuilder.array([]),
      workExperiences: this.formBuilder.array([]),
    });
  }

  getButtonAppId(prefix: string, correlationId: Guid): string {
    return `${prefix}_${correlationId}`;
  }

  openEducationDialog(): void {
    const dialogRef = this.dialog.open(EducationDialogComponent, {
      width: '800px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: Education | null) => {
      if (result) {
        this.educationSignal.update((currentArray) => [...currentArray, result]);

        const educationFA = this.dataForm.get('education') as FormArray;
        educationFA.push(this.createEducationFormGroup(result));
      }
    });
  }

  private createEducationFormGroup(education: Education): FormGroup {
    return this.formBuilder.group({
      correlationId: [education.correlationId],
      degree: [education.degree, Validators.required],
      institutionName: [education.institutionName, Validators.required],
      institutionLocation: [education.institutionLocation, Validators.required],
      description: [education.description],
      startDate: [education.startDate, Validators.required],
      endDate: [education.endDate],
    });
  }

  removeEducation(correlationIdToRemove: Guid): void {
    this.educationSignal.update((currentArray) =>
      currentArray.filter((edu) => edu.correlationId !== correlationIdToRemove)
    );

    // const educationFA = this.dataForm.get('education') as FormArray;
    // const indexToRemove = educationFA.controls.findIndex(control => control.value.correlationId === correlationIdToRemove);
    // if (indexToRemove > -1) {
    //   educationFA.removeAt(indexToRemove);
    // }
  }

  removeWorkExperience(correlationId: Guid): void {
    this.workExperienceArray = this.workExperienceArray.filter(
      (workExperience) => workExperience.correlationId !== correlationId
    );
  }

  saveData(): void {
    if (this.dataForm.valid) {
      const formData = this.dataForm.value;
      console.log('Form submitted:', formData);
    } else {
      console.log('Form is invalid');
    }
  }
}
