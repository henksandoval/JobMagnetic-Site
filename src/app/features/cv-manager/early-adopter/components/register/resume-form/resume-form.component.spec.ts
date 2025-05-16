import { ResumeFormComponent } from './resume-form.component';
import { render } from '@testing-library/angular';
import { ProfileService } from '../../../services/profile.service';
import { HttpService } from '@core/services/http/http.service';
import { RegisterComponent } from '../register.component';

describe(ResumeFormComponent.name, () => {
  let component: ResumeFormComponent;
  let mockRegisterComponent: Partial<RegisterComponent>;

  beforeEach(async () => {
    mockRegisterComponent = {
      getProfileId: jest.fn(),
    };

    const { fixture } = await render(ResumeFormComponent, {
      providers: [
        { provide: ProfileService, useValue: {} },
        { provide: HttpService, useValue: {} },
        { provide: RegisterComponent, useValue: mockRegisterComponent }
      ],
    });
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    component.ngOnInit();
    expect(component.dataForm).toBeDefined();
    expect(component.dataForm.controls['jobTitle']).toBeDefined();
    expect(component.dataForm.controls['about']).toBeDefined();
    expect(component.dataForm.controls['summary']).toBeDefined();
    expect(component.dataForm.controls['overview']).toBeDefined();
    expect(component.dataForm.controls['title']).toBeDefined();
    expect(component.dataForm.controls['suffix']).toBeDefined();
    expect(component.dataForm.controls['address']).toBeDefined();
  });
});
