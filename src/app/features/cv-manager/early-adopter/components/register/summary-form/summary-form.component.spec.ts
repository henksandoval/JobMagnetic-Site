import { SummaryFormComponent } from './summary-form.component';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { testTranslation } from '@core/tests/test-utils';
import { Education } from './interfaces/education';
import { format } from 'date-fns';

const educationEntries: Education[] = [
  {
    degree: 'Computer Science',
    institutionName: 'Computer Science Institute',
    institutionLocation: 'New York',
    description: 'Computer Science Description',
    startDate: new Date('2020-01-01'),
    endDate: new Date('2022-01-01'),
  },
  {
    degree: 'Mechanical Engineering',
    institutionName: 'Engineering Institute',
    institutionLocation: 'San Francisco',
    description: 'Mechanical Engineering Description',
    startDate: new Date('2018-05-01'),
    endDate: new Date('2020-05-01'),
  },
  {
    degree: 'Business Administration',
    institutionName: 'Business School',
    institutionLocation: 'Chicago',
    description: 'Business Administration Description',
    startDate: new Date('2015-09-01'),
    endDate: new Date('2018-06-01'),
  },
];

describe(SummaryFormComponent.name, () => {
  const user = userEvent.setup();

  beforeEach(async () => {
    await render(SummaryFormComponent, {
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  it('should render main title', async () => {
    expect(screen.getByTestId('summaryRegisterTitle')).toHaveTextContent('Step 3: Curriculum Data');
  });

  describe('Education Section', () => {
    it('should add new education entry', async () => {
      const educationEntry = educationEntries[0];

      await setEducationEntriesAsync(educationEntry);

      await assertEducationEntryAsync(educationEntry);
    });

    it('should add multiple education entries', async () => {
      for (const educationEntry of educationEntries) {
        await setEducationEntriesAsync(educationEntry);
      }

      for (const educationEntry of educationEntries) {
        await assertEducationEntryAsync(educationEntry);
      }
    }, 10000);
  });

  describe('Should display correct translations in the screen: ', () => {
    const testCases = [
      { testId: 'summaryRegisterTitle', key: 'summaryRegisterTitle' },
      { testId: 'introductionLabel', key: 'introduction' },
    ];

    testCases.forEach(({ testId, key }) => {
      it(`${key}`, async () => {
        testTranslation(testId, key);
      });
    });
  });

  const setEducationEntriesAsync = async (entry: Education) => {
    const addButton = screen.getByTestId('btnInsertEducation');
    const saveButton = screen.getByTestId('btnAddEducation');

    await user.click(addButton);

    const degreeInput = screen.getByTestId('inputDegree');
    const institutionNameInput = screen.getByTestId('inputInstitutionName');
    const institutionLocationInput = screen.getByTestId('inputInstitutionLocation');
    const descriptionInput = screen.getByTestId('inputDescription');
    const startDateInput = screen.getByTestId('inputStartDate');
    const endDateInput = screen.getByTestId('inputEndDate');

    await user.type(degreeInput, entry.degree);
    await user.type(institutionNameInput, entry.institutionName);
    await user.type(institutionLocationInput, entry.institutionLocation);
    await user.type(descriptionInput, entry.description);
    await user.type(startDateInput, entry.startDate.toISOString());
    await user.type(endDateInput, entry.endDate!.toISOString());

    await userEvent.click(saveButton);
  };

  const assertEducationEntryAsync = async (entry: Education) => {
    const startDateFormatted = format(new Date(entry.startDate), 'MMM d, yyyy');
    const endDateFormatted = format(new Date(entry.endDate!), 'MMM d, yyyy');

    await screen.findByText(entry.degree);
    await screen.findByText(entry.institutionName);
    await screen.findByText(entry.institutionLocation);
    await screen.findByText(entry.description);
    await screen.findByText(startDateFormatted);
    await screen.findByText(endDateFormatted);
  };
});
