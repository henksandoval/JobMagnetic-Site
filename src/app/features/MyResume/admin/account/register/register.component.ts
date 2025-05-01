import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../../home/services/profile.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  currentStep = 0;
  steps = [0, 1, 2];
  personalDataForm!: FormGroup;
  isSaving = false;
  urlEndpoints: string | undefined;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.urlEndpoints = this.profileService.getEndpoints().profile.personalData;
  }
  // Datos del formulario
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
    const urlEndpoint = this.urlEndpoints;
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
