import { SummaryFormComponent } from './summary-form.component';
import { render } from '@testing-library/angular';
import { testTranslation } from '@core/tests/test-utils';

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
    expect(component.dataForm.controls['Introduction']).toBeDefined();
  });

  describe('Should display correct translations in the screen: ', () => {
    const testCases = [
      { testId: 'curriculumData', key: 'curriculumData' },
      { testId: 'introductionLabel', key: 'introduction' },
      { testId: 'introductionInput', key: 'introductionPlaceholder' },
    ];

    testCases.forEach(({ testId, key }) => {
      it(`${key}`, () => {
        testTranslation(testId, key);
      });
    });
  });
});
