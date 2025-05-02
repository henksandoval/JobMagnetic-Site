import '@angular/localize/init';
import { render, screen  } from '@testing-library/angular';
import { IndexComponent } from './index.component';

describe(IndexComponent.name, () => {
  beforeEach(async () => {
    await render(IndexComponent);
  });

  it('should create the component', () => {
    expect(IndexComponent).toBeTruthy();
  });

  it('should display title', () => {
    expect(screen.getByTestId('headerTitle')).toHaveTextContent('Vista Early Adopter');
  });

  it('should show what is a view', () => {
    expect(screen.getByTestId('titleWhatIs')).toHaveTextContent('¿Qué es una Vista Early Adopter?');
  });

  it('It should show the key features', () => {
    expect(screen.getByTestId('titleFeatures')).toHaveTextContent('Características Clave');
  });

  it('It should show how you can help us.', () => {
    expect(screen.getByTestId('titleHelp')).toHaveTextContent('¿Cómo puedes ayudarnos?');
  });

  it('It should show the message I want to be an early adopter!', () => {
    expect(screen.getByTestId('buttonJoin')).toHaveTextContent('¡Quiero ser Early Adopter!');
  });
});
