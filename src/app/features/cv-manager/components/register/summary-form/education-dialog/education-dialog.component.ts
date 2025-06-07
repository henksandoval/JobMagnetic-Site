import { Component, inject, OnInit } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { SummaryStateService } from '../services/summary-state.service';
import { StateService } from '@core/services/state/state.service';
import { Education } from '../interfaces/education';

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
export class EducationDialogComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private stateService = inject(StateService);
  private readonly summaryStateService: SummaryStateService = inject(SummaryStateService);
  private dialogRef: MatDialogRef<EducationDialogComponent> = inject(MatDialogRef);
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
      const education: Education = this.educationForm.value;

      this.summaryStateService.setEducation(education);
      this.dialogRef.close(true);
    }
  }
}
