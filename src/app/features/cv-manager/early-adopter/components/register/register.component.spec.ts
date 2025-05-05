import { render } from '@testing-library/angular';
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
});
