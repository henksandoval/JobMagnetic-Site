import { ServiceFormComponent } from './service-form.component';
import { render, screen } from '@testing-library/angular';
import '@testing-library/jest-dom';
import '@angular/localize/init';
import translations from '../../../../../../../assets/i18n/messages.json';


describe(ServiceFormComponent.name, () => {
  let component: ServiceFormComponent;

  beforeEach(async () => {
    const { fixture } = await render(ServiceFormComponent, {
    });
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    component.ngOnInit();
    expect(component.serviceDataForm).toBeDefined();
    expect(component.serviceDataForm.controls['overview']).toBeDefined();
    expect(component.serviceDataForm.controls['position']).toBeDefined();
    expect(component.serviceDataForm.controls['title']).toBeDefined();
    expect(component.serviceDataForm.controls['description']).toBeDefined();
    expect(component.serviceDataForm.controls['urlLink']).toBeDefined();
    expect(component.serviceDataForm.controls['urlImage']).toBeDefined();
    expect(component.serviceDataForm.controls['urlVideo']).toBeDefined();
    expect(component.serviceDataForm.controls['type']).toBeDefined();
  });

  describe('Should display correct translations in the screen: ', () => {
    const testCases = [
      { testId: 'serviceData', key: 'serviceData' },
      { testId: 'overview', key: 'overview' },
      { testId: 'position', key: 'position' },
      { testId: 'title', key: 'title' },
      { testId: 'description', key: 'description' },
      { testId: 'urlLink', key: 'urlLink' },
      { testId: 'urlImage', key: 'urlImage' },
      { testId: 'urlVideo', key: 'urlVideo' },
      { testId: 'type', key: 'type' },
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

  it('should call saveServiceData when the save button is clicked', async () => {
    const saveServiceData = jest.spyOn(component, 'saveServiceData').mockImplementation(() => {});
    const saveButton = screen.getByRole('button', { name: /save/i });
    saveButton.click();
    expect(saveServiceData).toHaveBeenCalled();
  });
});
