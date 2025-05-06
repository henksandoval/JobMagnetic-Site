import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { ApiEndpoints } from '@core/constants/api-endpoints';
import { ProfileService } from '../../../services/profile.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile-form',
  imports: [AppIdDirective, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './profile-form.component.html',
})
export class ProfileFormComponent implements OnInit {
  isSaving = false;
  personalDataForm!: FormGroup;
  private readonly profileService: ProfileService = inject(ProfileService);
  private readonly fb: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.initializeForm();
  }

  savePersonalData(): void {
    if (this.isSaving) {
      return;
    }

    this.isSaving = true;
    const urlEndpoint = ApiEndpoints.profile.personalData;
    const personalData = this.personalDataForm.value;
    if (urlEndpoint != null) {
      this.profileService.saveData(urlEndpoint, personalData).subscribe(
        (response) => {
          console.log(response);
          this.isSaving = false;
        },
        (error) => {
          console.error('Error al guardar los datos:', error);
          this.isSaving = false;
        }
      );
    }
  }

  private initializeForm(): void {
    this.personalDataForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      profileImageUrl: [''],
      birthDate: [''],
      middleName: [''],
      secondLastName: [''],
    });
  }
}
