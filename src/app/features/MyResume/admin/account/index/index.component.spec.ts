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
    expect(screen.getByTestId('header_title')).toHaveTextContent('Vista Early Adopter');
  });

  it('should show what is a view', () => {
    expect(screen.getByTestId('title_what_is')).toHaveTextContent('¿Qué es una Vista Early Adopter?');
  });

  it('It should show the key features', () => {
    expect(screen.getByTestId('title_features')).toHaveTextContent('Características Clave');
  });

  it('It should show how you can help us.', () => {
    expect(screen.getByTestId('title_help')).toHaveTextContent('¿Cómo puedes ayudarnos?');
  });

  it('It should show the message I want to be an early adopter!', () => {
    expect(screen.getByTestId('button_join')).toHaveTextContent('¡Quiero ser Early Adopter!');
  });

});
