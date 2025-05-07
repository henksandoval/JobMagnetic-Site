import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { NgIf } from '@angular/common';
import { ProfileService } from '../../../services/profile.service';
import { ApiEndpoints } from '@core/constants/api-endpoints';

@Component({
  selector: 'app-resume-form',
  imports: [ReactiveFormsModule, AppIdDirective],
  templateUrl: './resume-form.component.html',
  styles: ``,
})
export class ResumeFormComponent implements OnInit {
  private readonly profileService: ProfileService = inject(ProfileService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  dataForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  saveResumeData(): void {
    const urlEndpoint = ApiEndpoints.profile.about;
    const resumeData = this.dataForm.value;

    this.profileService.saveData(urlEndpoint, resumeData).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error('Error saving resume data:', error);
      }
    );
  }

  private initializeForm(): void {
    this.dataForm = this.formBuilder.group({
      jobTitle: [''],
      about: [''],
      summary: [''],
      overview: [''],
      title: [''],
      suffix: [''],
      address: [''],
    });
  }
}
