import { AdminComponent } from './admin.component';
import { render, screen  } from '@testing-library/angular';
import '@testing-library/jest-dom';

describe(AdminComponent.name, () => {
  beforeEach(async () => {
    await render(AdminComponent);
  });

  it('should create the component', () => {
    expect(AdminComponent).toBeTruthy();
  });

  it('should display title', () => {
    expect(screen.getByTestId('header_title')).toHaveTextContent('Vista Early Adopter');
  });
});
