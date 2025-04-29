import '@angular/localize/init';
import { AdminComponent } from './admin.component';
import { render, screen  } from '@testing-library/angular';

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

  it('should show welcome', () => {
    expect(screen.getByTestId('welcome')).toHaveTextContent('Bienvenido a Early Adopter');
  });

  it('should show what is a view', () => {
    expect(screen.getByTestId('view')).toHaveTextContent('¿Qué es una Vista Early Adopter?');
  });

});
