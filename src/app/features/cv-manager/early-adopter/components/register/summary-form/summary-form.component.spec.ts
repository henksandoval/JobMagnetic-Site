import { SummaryFormComponent } from './summary-form.component';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { testTranslation } from '@core/tests/test-utils';
import { Education } from './interfaces/education';
import { format } from 'date-fns';
import { ComponentFixture } from '@angular/core/testing';
import { Guid } from 'guid-typescript';
import { WorkExperience } from './interfaces/work-experience';

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

const workExperienceEntries: WorkExperience[] = [
  {
    jobTitle: 'Software Engineer',
    companyName: 'Tech Company',
    companyLocation: 'Los Angeles',
    description: 'Software Engineer Description',
    startDate: new Date('2022-01-01'),
    endDate: new Date('2023-01-01'),
    responsibilities: ['Developed software', 'Collaborated with team'],
  },
  {
    jobTitle: 'Data Analyst',
    companyName: 'Data Company',
    companyLocation: 'Seattle',
    description: 'Data Analyst Description',
    startDate: new Date('2020-06-01'),
    endDate: new Date('2022-06-01'),
    responsibilities: ['Analyzed data', 'Created reports'],
  },
];
describe(SummaryFormComponent.name, () => {
  const user = userEvent.setup();
  let componentFixture: ComponentFixture<SummaryFormComponent>;


  beforeEach(async () => {
    const { fixture } = await render(SummaryFormComponent, {
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    });

    componentFixture = fixture;
  });

  it('should render main title', async () => {
    expect(screen.getByTestId('summaryRegisterTitle')).toHaveTextContent('Step 3: Curriculum Data');
  });

  describe('Education Section', () => {
    it('should add new education entry', async () => {
      const education = educationEntries[0];

      await setEducationEntriesAsync(education);

      await assertEducationEntryAsync(education);
    });

    it('should add multiple education entries', async () => {
      for (const education of educationEntries) {
        await setEducationEntriesAsync(education);
      }

      for (const education of educationEntries) {
        await assertEducationEntryAsync(education);
      }
    }, 10000);

    it('should remove education entry', async () => {
      const education = educationEntries[0];

      await setEducationEntriesAsync(education);
      const component = componentFixture.componentInstance;

      const itemToDelete: Guid = component.educationArray[0].correlationId!;
      const deleteButtonId: string = component.getButtonAppId('btnRemoveEducation', itemToDelete);
      const deleteButton = screen.getByTestId(deleteButtonId);
      await user.click(deleteButton);

      expect(screen.queryByText(education.degree)).toBeNull();
      expect(screen.queryByText(education.institutionName)).toBeNull();
      expect(screen.queryByText(education.institutionLocation)).toBeNull();
      expect(screen.queryByText(education.description)).toBeNull();
    });
  });

  describe('WorkExperience Section', () => {
    it('should add new WorkExperience entry', async () => {
      const workExperience = workExperienceEntries[0];

      await setWorkExperienceEntriesAsync(workExperience);

      await assertWorkExperienceEntryAsync(workExperience);
    });

    it('should add multiple WorkExperience entries', async () => {
      for (const workExperience of workExperienceEntries) {
        await setWorkExperienceEntriesAsync(workExperience);
      }

      for (const workExperience of workExperienceEntries) {
        await assertWorkExperienceEntryAsync(workExperience);
      }
    }, 10000);

    it('should remove WorkExperience entry', async () => {
      const workExperience = workExperienceEntries[0];

      await setWorkExperienceEntriesAsync(workExperience);
      const component = componentFixture.componentInstance;

      const itemToDelete: Guid = component.educationArray[0].correlationId!;
      const deleteButtonId: string = component.getButtonAppId('btnRemoveEducation', itemToDelete);
      const deleteButton = screen.getByTestId(deleteButtonId);
      await user.click(deleteButton);

      expect(screen.queryByText(workExperience.jobTitle)).toBeNull();
      expect(screen.queryByText(workExperience.companyName)).toBeNull();
      expect(screen.queryByText(workExperience.companyLocation)).toBeNull();
      expect(screen.queryByText(workExperience.description)).toBeNull();
    });
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

  const setEducationEntriesAsync = async (education: Education) => {
    const addButton = screen.getByTestId('btnInsertEducation');
    const saveButton = screen.getByTestId('btnAddEducation');

    await user.click(addButton);

    const degreeInput = screen.getByTestId('inputDegree');
    const institutionNameInput = screen.getByTestId('inputInstitutionName');
    const institutionLocationInput = screen.getByTestId('inputInstitutionLocation');
    const descriptionInput = screen.getByTestId('inputDescription');
    const startDateInput = screen.getByTestId('inputStartDate');
    const endDateInput = screen.getByTestId('inputEndDate');

    await user.type(degreeInput, education.degree);
    await user.type(institutionNameInput, education.institutionName);
    await user.type(institutionLocationInput, education.institutionLocation);
    await user.type(descriptionInput, education.description);
    await user.type(startDateInput, education.startDate.toISOString());
    await user.type(endDateInput, education.endDate!.toISOString());

    await userEvent.click(saveButton);
  };

  const assertEducationEntryAsync = async (education: Education) => {
    const startDateFormatted = format(new Date(education.startDate), 'MMM d, yyyy');
    const endDateFormatted = format(new Date(education.endDate!), 'MMM d, yyyy');

    await screen.findByText(education.degree);
    await screen.findByText(education.institutionName);
    await screen.findByText(education.institutionLocation);
    await screen.findByText(education.description);
    await screen.findByText(startDateFormatted);
    await screen.findByText(endDateFormatted);
  };

  const setWorkExperienceEntriesAsync = async (workExperience: WorkExperience) => {
    const addButton = screen.getByTestId('btnInsertWorkExperience');
    const saveButton = screen.getByTestId('btnAddWorkExperience');

    await user.click(addButton);

    const degreeInput = screen.getByTestId('inputJobTitle');
    const institutionNameInput = screen.getByTestId('inputCompanyName');
    const institutionLocationInput = screen.getByTestId('inputCompanyLocation');
    const descriptionInput = screen.getByTestId('inputDescription');
    const startDateInput = screen.getByTestId('inputStartDate');
    const endDateInput = screen.getByTestId('inputEndDate');

    await user.type(degreeInput, workExperience.jobTitle);
    await user.type(institutionNameInput, workExperience.companyName);
    await user.type(institutionLocationInput, workExperience.companyLocation);
    await user.type(descriptionInput, workExperience.description);
    await user.type(startDateInput, workExperience.startDate.toISOString());
    await user.type(endDateInput, workExperience.endDate!.toISOString());
    await user.type(endDateInput, workExperience.endDate!.toISOString());

    await userEvent.click(saveButton);
  };

  const assertWorkExperienceEntryAsync = async (workExperience: WorkExperience) => {
    const startDateFormatted = format(new Date(workExperience.startDate), 'MMM d, yyyy');
    const endDateFormatted = format(new Date(workExperience.endDate!), 'MMM d, yyyy');

    await screen.findByText(workExperience.jobTitle);
    await screen.findByText(workExperience.companyName);
    await screen.findByText(workExperience.companyLocation);
    await screen.findByText(workExperience.description);
    await screen.findByText(startDateFormatted);
    await screen.findByText(endDateFormatted);
  };
});
