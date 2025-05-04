import '@testing-library/jest-dom';
import '@angular/localize/init';
import { render } from '@testing-library/angular';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ProfileService } from '../../../../cv-viewer/my-resume/services/profile.service';

describe(RegisterComponent.name, () => {
  let mockProfileService: Partial<ProfileService>;
  let componentInstance: RegisterComponent;

  beforeEach(async () => {
    mockProfileService = {
      getEndpoints: jest.fn().mockReturnValue({
        profile: {
          personalData: 'https://api.example.com/profile/personal-data',
        },
      }),
      saveData: jest.fn().mockReturnValue(of({ success: true })),
    };

    const { fixture } = await render(RegisterComponent, {
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: ProfileService, useValue: mockProfileService },
      ],
    });

    componentInstance = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(componentInstance).toBeTruthy();
  });

  it('should call savePersonalData without errors', () => {
    componentInstance.savePersonalData();
    expect(mockProfileService.saveData).toHaveBeenCalled();
  });

  it('should initialize the form correctly', () => {
    componentInstance.ngOnInit();
    expect(componentInstance.personalDataForm).toBeDefined();
    expect(componentInstance.personalDataForm.controls['firstName']).toBeDefined();
    expect(componentInstance.personalDataForm.controls['lastName']).toBeDefined();
    expect(componentInstance.personalDataForm.controls['profileImageUrl']).toBeDefined();
    expect(componentInstance.personalDataForm.controls['birthDate']).toBeDefined();
    expect(componentInstance.personalDataForm.controls['middleName']).toBeDefined();
    expect(componentInstance.personalDataForm.controls['secondLastName']).toBeDefined();
  });
});
