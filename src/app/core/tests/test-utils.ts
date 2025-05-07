import { screen } from '@testing-library/angular';
import { translations } from '../../../assets/i18n/messages.json';

export function testTranslation(testId: string, key: string): void {
  if (!(key in translations)) {
    throw new Error(`Missing translation for key: ${key}`);
  }

  const element = screen.getByTestId(testId);

  const expectedTranslation = translations[key as keyof typeof translations];
  expect(element).toBeInTheDocument();
  expect(element).toHaveTextContent(expectedTranslation);
}
