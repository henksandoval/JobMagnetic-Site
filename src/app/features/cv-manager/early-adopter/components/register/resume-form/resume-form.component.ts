import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { ProfileService } from '../../../services/profile.service';
import { ApiEndpoints } from '@core/constants/api-endpoints';
import { ResumeCreateCommand, ResumeFormData } from '../models/resumeFormData.model';
import { NgIf } from '@angular/common';
import { RegisterComponent } from '../register.component';

@Component({
  selector: 'app-resume-form',
  imports: [ReactiveFormsModule, AppIdDirective, NgIf],
  templateUrl: './resume-form.component.html',
  styles: ``,
})
export class ResumeFormComponent implements OnInit {
  private readonly profileService: ProfileService = inject(ProfileService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly registerComponent: RegisterComponent = inject(RegisterComponent);
  dataForm!: FormGroup;
  profileId = this.registerComponent.profileIdSignal;
  isSaving = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  saveResumeData(): void {
    debugger;
    if (this.isSaving) {
      return;
    }
    const profileId = this.profileId();
    if (!profileId) {
      console.error('No se puede guardar el resumen: el perfil ID es nulo.');
      return;
    }
    this.isSaving = true;
    const urlEndpoint = ApiEndpoints.profile.about;
    const formData: ResumeFormData = this.dataForm.value;
    const createResume = this.transformFormDataResume(formData, profileId);

    this.profileService.saveData(urlEndpoint, createResume).subscribe(
      (response) => {
        console.log(response);
        this.isSaving = false;
      },
      (error) => {
        console.error('Error saving resume data:', error);
        this.isSaving = false;
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

  private transformFormDataResume(formData: ResumeFormData, profileId: string): ResumeCreateCommand {
    return {
      ResumeQueryData: {
        profileId: profileId,
        jobTitle: formData.jobTitle,
        about: formData.about,
        summary: formData.summary,
        overview: formData.overview,
        title: formData.title,
        suffix: formData.suffix,
        address: formData.address,
      },
    };
  }
}
