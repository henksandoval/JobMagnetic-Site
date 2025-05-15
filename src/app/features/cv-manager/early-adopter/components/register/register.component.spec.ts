import { render, screen } from '@testing-library/angular';
import { RegisterComponent } from './register.component';
import { of } from 'rxjs';
import { ProfileService } from '../../services/profile.service';

describe(RegisterComponent.name, () => {
  let componentInstance: RegisterComponent;

  const mockProfileService = {
    saveProfile: jest.fn(() => of({})),
  };

  beforeEach(async () => {
    const { fixture } = await render(RegisterComponent, {
      providers: [{ provide: ProfileService, useValue: mockProfileService }],
    });

    componentInstance = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(componentInstance).toBeTruthy();
  });

  it('should render the ProfileFormComponent with <app-profile-form>', () => {
    const profileElement = screen.getByTestId('profile-component');
    expect(profileElement).toBeTruthy();
  });

  it('should render the ResumeFormComponent with <app-resume-form>', () => {
    const profileElement = screen.getByTestId('resume-component');
    expect(profileElement).toBeTruthy();
  });

  it('should render the SummaryFormComponent with <app-summary-form>', () => {
    const profileElement = screen.getByTestId('resume-component');
    expect(profileElement).toBeTruthy();
  });

  it('should render the ServiceFormComponent with <app-service-form>', () => {
    const profileElement = screen.getByTestId('service-component');
    expect(profileElement).toBeTruthy();
  });
});
