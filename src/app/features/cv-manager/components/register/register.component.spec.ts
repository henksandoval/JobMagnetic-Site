import { render, screen } from '@testing-library/angular';
import { RegisterComponent } from './register.component';
import { of } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Config } from '@core/services/config/interfaces/config';
import { ConfigService } from '@core/services/config/config.service';

const apiUrl = 'https://api.example.com';
describe(RegisterComponent.name, () => {
  let mockConfigService: Partial<ConfigService>;
  let componentInstance: RegisterComponent;

  const mockProfileService = {
    saveProfile: jest.fn(() => of({})),
  };

  beforeEach(async () => {
    const config: Config = {
      useAPI: true,
      apiUrl: apiUrl,
    };

    mockConfigService = {
      getConfig: () => config,
    };

    const { fixture } = await render(RegisterComponent, {
      providers: [
        { provide: ConfigService, useValue: mockConfigService },
        { provide: ProfileService, useValue: mockProfileService },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
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

  it('should render the TestimonialsFormComponent with <app-testimonials-form-list>', () => {
    const profileElement = screen.getByTestId('testimonials-component');
    expect(profileElement).toBeTruthy();
  });

  it('should render the SkillsFormComponent with <app-skills-form>', () => {
    const profileElement = screen.getByTestId('skills-component');
    expect(profileElement).toBeTruthy();
  });
});
