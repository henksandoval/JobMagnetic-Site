import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { DatePipe, NgForOf } from '@angular/common';
import { Education } from './interfaces/education';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-summary-form',
  imports: [ReactiveFormsModule, AppIdDirective, DatePipe, NgForOf],
  templateUrl: './summary-form.component.html',
  styles: ``,
})
export class SummaryFormComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  dataForm!: FormGroup;
  educationArray: Education[] = [];
  educationForm!: FormGroup;
  workExperienceForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForms();
  }

  private initializeForms() {
    this.dataForm = this.formBuilder.group({
      introduction: ['', [Validators.required]],
      education: this.formBuilder.array([]),
      workExperiences: this.formBuilder.array([]),
    });

    this.educationForm = this.formBuilder.group({
      degree: ['', [Validators.required]],
      institutionName: ['', [Validators.required]],
      institutionLocation: ['', [Validators.required]],
      description: [''],
      startDate: ['', [Validators.required]],
      endDate: [''],
    });

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

  get workExperienceFormArray(): FormArray {
    return this.dataForm.get('workExperiences') as FormArray;
  }

  confirmAddEducation(): void {
    if (this.educationForm.valid) {
      const education = this.educationForm.value as Education;
      this.educationArray.push(education);

      this.educationForm.reset();
    } else {
      console.log('Invalid education form');
    }
  }

  confirmAddWorkExperience(): void {
    if (this.workExperienceForm.valid) {
      this.workExperienceFormArray.push(this.formBuilder.group(this.workExperienceForm.value));
      console.log('Work Experience added:', this.workExperienceForm.value);

      this.workExperienceForm.reset();
    } else {
      console.log('Invalid work experience form');
    }
  }

  removeEducation(correlationId: Guid): void {
    console.log('Education removed at index:', correlationId);
  }

  removeWorkExperience(index: number): void {
    this.workExperienceFormArray.removeAt(index);
    console.log('Work experience removed at index:', index);
  }

  onSubmit(): void {
    if (this.dataForm.valid) {
      const formData = this.dataForm.value;
      console.log('Form submitted:', formData);
    } else {
      console.log('Form is invalid');
    }
  }
}
