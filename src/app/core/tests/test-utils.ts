import { screen } from '@testing-library/angular';
import { translations } from '../../../assets/i18n/messages.json';

export function testTranslationByText(key: string): void {
  if (!(key in translations)) {
    throw new Error(`Missing translation for key: ${key}`);
  }
  const expectedTranslation = translations[key as keyof typeof translations];

  const element = screen.getByText(expectedTranslation);

  expect(element).toBeInTheDocument();
  expect(element).toHaveTextContent(expectedTranslation);
}

export function testTranslationByTestId(testId: string, key: string): void {
  if (!(key in translations)) {
    throw new Error(`Missing translation for key: ${key}`);
  }

  const element = screen.getByTestId(testId);

  const expectedTranslation = translations[key as keyof typeof translations];
  expect(element).toBeInTheDocument();
  expect(element).toHaveTextContent(expectedTranslation);
}
