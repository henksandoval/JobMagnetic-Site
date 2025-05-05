import { render, screen } from '@testing-library/angular';
import { EarlyAdopterComponent } from './early-adopter.component';
import { provideRouter } from '@angular/router';

describe(EarlyAdopterComponent.name, () => {
  let componentInstance: EarlyAdopterComponent;

  beforeEach(async () => {
    const { fixture } = await render(EarlyAdopterComponent, { providers: [provideRouter([])] });

    componentInstance = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(componentInstance).toBeTruthy();
  });

  it('should render the EarlyAdopterHeaderComponent with <app-early-adopter-header>', () => {
    const profileElement = screen.getByTestId('early-adopter-header');
    expect(profileElement).toBeTruthy();
  });
});
