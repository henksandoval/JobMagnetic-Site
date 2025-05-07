import { SummaryFormComponent } from './summary-form.component';
import { render, screen } from '@testing-library/angular';
import translations from '../../../../../../../assets/i18n/messages.json';

describe(SummaryFormComponent.name, () => {
  let component: SummaryFormComponent;

  beforeEach(async () => {
    const { fixture } = await render(SummaryFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    component.ngOnInit();
    expect(component.dataForm).toBeDefined();
    expect(component.dataForm.controls['jobTitle']).toBeDefined();
    expect(component.dataForm.controls['about']).toBeDefined();
    expect(component.dataForm.controls['summary']).toBeDefined();
    expect(component.dataForm.controls['overview']).toBeDefined();
    expect(component.dataForm.controls['title']).toBeDefined();
    expect(component.dataForm.controls['suffix']).toBeDefined();
    expect(component.dataForm.controls['address']).toBeDefined();
  });

  describe('Should display correct translations in the screen: ', () => {
    const testCases = [
      { testId: 'curriculumData', key: 'curriculumData' },
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
