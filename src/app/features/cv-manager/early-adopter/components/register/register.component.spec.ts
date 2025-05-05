import { render, screen } from '@testing-library/angular';
import { RegisterComponent } from './register.component';

describe(RegisterComponent.name, () => {
  let componentInstance: RegisterComponent;

  beforeEach(async () => {
    const { fixture } = await render(RegisterComponent);

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
