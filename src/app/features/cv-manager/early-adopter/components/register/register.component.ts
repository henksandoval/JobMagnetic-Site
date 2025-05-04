import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile.service';
import { ApiEndpoints } from '@core/constants/api-endpoints';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, AppIdDirective, CommonModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  currentStep = 0;
  steps = [0, 1, 2];
  personalDataForm!: FormGroup;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
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
          alert('¡Datos guardados exitosamente!');
          this.isSaving = false;
        },
        (error) => {
          console.error('Error al guardar los datos:', error);
        }
      );
    }
  }
}
