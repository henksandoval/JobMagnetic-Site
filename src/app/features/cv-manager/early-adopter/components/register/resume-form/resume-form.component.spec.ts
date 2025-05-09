import { ResumeFormComponent } from './resume-form.component';
import { render, screen } from '@testing-library/angular';
import translations from '../../../../../../../assets/i18n/messages.json';
import { ProfileService } from '../../../services/profile.service';
import { HttpService } from '@core/services/http/http.service';

describe(ResumeFormComponent.name, () => {
  let component: ResumeFormComponent;

  beforeEach(async () => {
    const { fixture } = await render(ResumeFormComponent, {
      providers: [
        { provide: ProfileService, useValue: {} },
        { provide: HttpService, useValue: {} },
      ],
    });
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
      { testId: 'jobTitle', key: 'jobTitle' },
      { testId: 'about', key: 'about' },
      { testId: 'summary', key: 'summary' },
      { testId: 'overview', key: 'overview' },
      { testId: 'title', key: 'title'},
      { testId: 'suffix', key: 'suffix'},
      { testId: 'address', key: 'address'}
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

  it('should call saveResumeData when the save button is clicked', async () => {
    const saveResumeData = jest.spyOn(component, 'saveResumeData').mockImplementation(() => {});
    const saveButton = screen.getByRole('button', { name: /save/i });
    saveButton.click();
    expect(saveResumeData).toHaveBeenCalled();
  });

});
