import { SummaryFormComponent } from './summary-form.component';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { testTranslation } from '@core/tests/test-utils';

describe(SummaryFormComponent.name, () => {
  const setup = async () => {
    return await render(SummaryFormComponent, {
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  };

  it('should render main title', async () => {
    await setup();
    expect(
      screen.getByTestId('summaryRegisterTitle')
    ).toHaveTextContent('Step 3: Curriculum Data');
  });

  describe('Education Section', () => {
    it('should add new education entry', async () => {
      const { fixture } = await setup();
      const component = fixture.componentInstance;

      const addButton = screen.getByTestId('btnInsertEducation');
      await userEvent.click(addButton);

      const degreeInput = screen.getByTestId('inputDegree');
      const institutionNameInput = screen.getByTestId('inputInstitutionName');
      const institutionLocationInput = screen.getByTestId('inputInstitutionLocation');
      const descriptionInput = screen.getByTestId('inputDescription');
      const startDateInput = screen.getByTestId('inputStartDate');
      const endDateInput = screen.getByTestId('inputEndDate');

      await userEvent.type(degreeInput, 'Computer Science');
      await userEvent.type(institutionNameInput, 'Computer Science Institute');
      await userEvent.type(institutionLocationInput, 'New York');
      await userEvent.type(descriptionInput, 'Computer Science Description');
      await userEvent.type(startDateInput, '2020-01-01');
      await userEvent.type(endDateInput, '2022-01-01');

      const saveButton = screen.getByTestId('btnAddEducation');
      await userEvent.click(saveButton);

      expect(component.educationArray.length).toBe(1);
    });
  });

  describe('Should display correct translations in the screen: ', () => {
    const testCases = [
      { testId: 'summaryRegisterTitle', key: 'summaryRegisterTitle' },
      { testId: 'introductionLabel', key: 'introduction' },
    ];

    testCases.forEach(({ testId, key }) => {
      it(`${key}`, () => {
        testTranslation(testId, key);
      });
    });
  });
});
