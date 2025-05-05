import '@testing-library/jest-dom';
import '@angular/localize/init';
import { render } from '@testing-library/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ProfileService } from '../../../services/profile.service';
import { ProfileComponent } from './profile.component';

describe(ProfileComponent.name, () => {
  let mockProfileService: Partial<ProfileService>;
  let componentInstance: ProfileComponent;

  beforeEach(async () => {
    mockProfileService = {
      saveData: jest.fn().mockReturnValue(of({ success: true })),
    };

    const { fixture } = await render(ProfileComponent, {
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

  it('should call savePersonalData without errors', () => {
    componentInstance.savePersonalData();
    expect(mockProfileService.saveData).toHaveBeenCalled();
  });
});
