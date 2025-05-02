import '@angular/localize/init';
import { loadTranslations } from '@angular/localize';
import { render, screen  } from '@testing-library/angular';
import { IndexComponent } from './index.component';

describe(IndexComponent.name, () => {
  beforeEach(async () => {
    loadTranslations({
      'headerTitle': 'Vista Early Adopter TEST',
    });
    await render(IndexComponent);
  });

  it('should create the component', () => {
    expect(IndexComponent).toBeTruthy();
  });

  it('should display title', () => {
    expect(screen.getByTestId('headerTitle')).toHaveTextContent('Vista Early Adopter TEST');
  });
});
