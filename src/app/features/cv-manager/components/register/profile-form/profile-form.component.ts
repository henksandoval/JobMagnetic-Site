import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiEndpoints } from '@core/constants/api-endpoints';
import { ProfileService } from '../../../services/profile.service';
import { NgIf } from '@angular/common';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { StateService } from '@core/services/state/state.service';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ProfileCommandModel } from './interfaces/profileCommand';
import { ResponseBackendModel } from './interfaces/responseBackend';
import { ProfileDataModel } from './interfaces/ProfileData';

@Component({
  selector: 'app-profile-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatProgressSpinner,
    MatButton,
    MatInput,
    MatLabel,
    MatFormField,
  ],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss',
})
export class ProfileFormComponent implements OnInit {
  private readonly stateService: StateService = inject(StateService);
  private readonly profileService: ProfileService = inject(ProfileService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  isSaving = false;
  personalDataForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  savePersonalData(): void {
    if (this.isSaving) {
      return;
    }

    this.isSaving = true;
    const urlEndpoint = ApiEndpoints.profile.personalData;
    const profileForm: ProfileDataModel = this.personalDataForm.value;
    const createProfile: ProfileCommandModel = this.transformFormDataProfile(profileForm);

    if (urlEndpoint != null) {
      this.profileService
        .saveData<ProfileCommandModel, ResponseBackendModel>(urlEndpoint, createProfile)
        .pipe(
          tap((response: ResponseBackendModel) => {
            if (response.id) {
              this.stateService.setProfileId(response.id);
            } else {
              console.warn('No se recibió un ID en la respuesta del backend.');
            }
          }),
          catchError((error) => {
            this.isSaving = false;
            return throwError(() => new Error('Error al guardar los datos', error));
          }),
          finalize(() => {
            this.isSaving = false;
          })
        )
        .subscribe();
    }
  }

  private initializeForm(): void {
    this.personalDataForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      profileImageUrl: [''],
      birthDate: [''],
      middleName: [''],
      secondLastName: [''],
    });
  }

  private transformFormDataProfile(formData: ProfileDataModel): ProfileCommandModel {
    return {
      profileData: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        profileImageUrl: formData.profileImageUrl,
        birthDate: formData.birthDate,
        middleName: formData.middleName,
        secondLastName: formData.secondLastName,
      },
    };
  }
}
