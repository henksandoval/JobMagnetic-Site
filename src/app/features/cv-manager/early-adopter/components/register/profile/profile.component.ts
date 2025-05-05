import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { Profile } from '../../../../../cv-viewer/my-resume/components/profile/interfaces/profile';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, ReactiveFormsModule, AppIdDirective],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  @Input() profileSet!: Profile;
  personalDataForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
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
}
