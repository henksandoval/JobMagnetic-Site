import { render } from '@testing-library/angular';
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
});
