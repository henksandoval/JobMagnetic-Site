import '@angular/localize/init';
import { loadTranslations } from '@angular/localize';
import { render, screen  } from '@testing-library/angular';
import { IndexComponent } from './index.component';
import translations from '../../../../../../assets/i18n/messages.json';

describe(IndexComponent.name, () => {
  beforeEach(async () => {
    loadTranslations(translations.translations);
    await render(IndexComponent);
  });

  it('should create the component', () => {
    expect(IndexComponent).toBeTruthy();
  });

  describe('Should display correct translation for key: ', () => {
    const testCases = [
      { testId: 'headerTitle', key: 'headerTitle' },
      { testId: 'titleWhatIs', key: 'titleWhatIs' },
      { testId: 'titleFeatures', key: 'titleFeatures' },
      { testId: 'titleHelp', key: 'titleHelp' },
      { testId: 'buttonJoin', key: 'buttonJoin' }
    ];

    testCases.forEach(({ testId, key }) => {
      it(`${key}`, () => {
        if (!(key in translations.translations)) {
          throw new Error(`Missing translation for key: ${key}`);
        }

        const element = screen.getByTestId(testId);

        const expectedTranslation = translations.translations[key as keyof typeof translations.translations];
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent(expectedTranslation);
      });
    });
  });
});
