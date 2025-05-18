import { EarlyAdopterHeaderComponent } from './early-adopter-header.component';
import { loadTranslations } from '@angular/localize';
import translations from '../../../../../assets/i18n/messages.json';
import { render, screen } from '@testing-library/angular';

describe(EarlyAdopterHeaderComponent.name, () => {
  beforeEach(async () => {
    loadTranslations(translations.translations);
    await render(EarlyAdopterHeaderComponent);
  });

  it('Should create the component', () => {
    expect(EarlyAdopterHeaderComponent).toBeTruthy();
  });

  it('Should display title with translations', () => {
    const key = 'headerTitle';
    const element = screen.getByTestId(key);

    const expectedTranslation = translations.translations[key as keyof typeof translations.translations];
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(expectedTranslation);
  });
});
