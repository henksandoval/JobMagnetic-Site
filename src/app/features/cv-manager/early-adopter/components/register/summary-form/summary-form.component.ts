import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { DatePipe } from '@angular/common';
import { Education } from './interfaces/education';
import { Guid } from 'guid-typescript';
import { WorkExperience } from './interfaces/work-experience';

@Component({
  selector: 'app-summary-form',
  imports: [ReactiveFormsModule, AppIdDirective, DatePipe],
  templateUrl: './summary-form.component.html',
  styles: ``,
})
export class SummaryFormComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  dataForm!: FormGroup;
  educationArray: Education[] = [];
  workExperienceArray: WorkExperience[] = [];
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

  getButtonAppId(prefix: string, correlationId: Guid): string {
    return `${prefix}_${correlationId}`;
  }

  confirmAddEducation(): void {
    if (this.educationForm.valid) {
      const education = this.educationForm.value as Education;
      education.correlationId = Guid.create();
      this.educationArray.push(education);

      this.educationForm.reset();
    }
  }

  confirmAddWorkExperience(): void {
    if (this.workExperienceForm.valid) {
      const workExperience = this.workExperienceForm.value as WorkExperience;
      workExperience.correlationId = Guid.create();
      this.workExperienceArray.push(workExperience);

      this.workExperienceForm.reset();
    }
  }

  removeEducation(correlationId: Guid): void {
    this.educationArray = this.educationArray.filter((education) => education.correlationId !== correlationId);
  }

  removeWorkExperience(correlationId: Guid): void {
    this.workExperienceArray = this.workExperienceArray.filter((workExperience) => workExperience.correlationId !== correlationId);
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
