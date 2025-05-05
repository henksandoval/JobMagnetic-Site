import { render, screen } from '@testing-library/angular';
import { RegisterComponent } from './register.component';
import { of } from 'rxjs';
import { ProfileService } from '../../services/profile.service';

describe(RegisterComponent.name, () => {
  let componentInstance: RegisterComponent;

  const mockProfileService = {
    saveProfile: jest.fn(() => of({}))
  };

  beforeEach(async () => {
    const { fixture } = await render(RegisterComponent, {
      providers: [
        { provide: ProfileService, useValue: mockProfileService },
      ]
    });

    componentInstance = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(componentInstance).toBeTruthy();
  });

  it('should render the ProfileComponent with <app-profile>', () => {
    const profileElement = screen.getByTestId('profile-component');
    expect(profileElement).toBeTruthy();
  });
});
