import { SummaryFormComponent } from './summary-form.component';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { testTranslationByText } from '@core/tests/test-utils';
import { Education } from './interfaces/education';
import { format } from 'date-fns';
import { ComponentFixture } from '@angular/core/testing';
import { WorkExperience } from './interfaces/work-experience';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ConfigService } from '@core/services/config/config.service';
import { StateService } from '@core/services/state/state.service';
import { HttpService } from '@core/services/http/http.service';
import { Config } from '@core/services/config/interfaces/config';

const educationEntries: Education[] = [
  {
    degree: 'Computer Science',
    institutionName: 'Computer Science Institute',
    institutionLocation: 'New York',
    description: 'Computer Science Description',
    startDate: new Date('2020-01-01'),
    endDate: new Date('2022-01-01'),
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

const apiUrl = 'https://api.example.com';

const assertEducationEntryAsync = async (education: Education) => {
  const startDateFormatted = format(new Date(education.startDate), 'MMM d, yyyy');
  const endDateFormatted = format(new Date(education.endDate!), 'MMM d, yyyy');

  expect(await screen.findByText(education.degree)).toBeInTheDocument();
  expect(await screen.findByText(education.institutionName)).toBeInTheDocument();
  expect(await screen.findByText(education.institutionLocation)).toBeInTheDocument();
  expect(await screen.findByText(education.description)).toBeInTheDocument();
  expect(await screen.findByText(startDateFormatted)).toBeInTheDocument();
  expect(await screen.findByText(endDateFormatted)).toBeInTheDocument();
};

const assertWorkExperienceEntryAsync = async (workExperience: WorkExperience) => {
  const startDateFormatted = format(new Date(workExperience.startDate), 'MMM d, yyyy');
  const endDateFormatted = format(new Date(workExperience.endDate!), 'MMM d, yyyy');

  expect(await screen.findByText(workExperience.jobTitle)).toBeInTheDocument();
  expect(await screen.findByText(workExperience.companyName)).toBeInTheDocument();
  expect(await screen.findByText(workExperience.companyLocation)).toBeInTheDocument();
  expect(await screen.findByText(workExperience.description)).toBeInTheDocument();
  expect(await screen.findByText(startDateFormatted)).toBeInTheDocument();
  expect(await screen.findByText(endDateFormatted)).toBeInTheDocument();
};

interface DialogTestCase<TData, TKey extends keyof TData> {
  sectionName: string;
  addButtonTestId: string;
  entryData: TData;
  getComponentArray: () => TData[];
  assertEntryDisplayedFn: (entry: TData) => Promise<void>;
  keyPropertyForAbsenceCheck: TKey;
}

type EducationTestCase = DialogTestCase<Education, keyof Education>;
type WorkExperienceTestCase = DialogTestCase<WorkExperience, keyof WorkExperience>;

describe(SummaryFormComponent.name, () => {
  const user = userEvent.setup();
  let mockConfigService: Partial<ConfigService>;
  let mockStateService: Partial<StateService>;
  let mockHttpService: Partial<HttpService>;
  let componentFixture: ComponentFixture<SummaryFormComponent>;
  let matDialogSpy: jest.SpyInstance;

  beforeEach(async () => {
    const config: Config = {
      useAPI: true,
      apiUrl: apiUrl,
    };
    const mockMatDialog = {
      open: jest.fn(),
    };

    mockConfigService = {
      getConfig: () => config,
    };

    mockStateService = {
      tryGetProfileId: () => '12345',
    };

    mockHttpService = {
      post: jest.fn().mockReturnValue(of({ success: true })),
    };

    const { fixture } = await render(SummaryFormComponent, {
      imports: [ReactiveFormsModule, MatDialogModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: HttpService, useValue: mockHttpService },
        { provide: StateService, useValue: mockStateService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    componentFixture = fixture;
    matDialogSpy = mockMatDialog.open;
  });

  it('should render main title', async () => {
    expect(screen.getByTestId('summaryRegisterTitle')).toHaveTextContent('Step 3: Curriculum Data');
  });

  const dialogTestCases: (EducationTestCase | WorkExperienceTestCase)[] = [
    {
      sectionName: 'Education',
      addButtonTestId: 'btnInsertEducation',
      entryData: educationEntries[0],
      getComponentArray: () => componentFixture.componentInstance.educationArray(),
      assertEntryDisplayedFn: assertEducationEntryAsync,
      keyPropertyForAbsenceCheck: 'degree',
    },
    {
      sectionName: 'Work Experience',
      addButtonTestId: 'btnInsertWorkExperience',
      entryData: workExperienceEntries[0],
      getComponentArray: () => componentFixture.componentInstance.workExperienceArray(),
      assertEntryDisplayedFn: assertWorkExperienceEntryAsync,
      keyPropertyForAbsenceCheck: 'jobTitle',
    },
  ];

  describe.each(dialogTestCases)(
    '$sectionName Section (Integration with Dialogue)',
    (testCase) => {
      const {
        addButtonTestId,
        entryData,
        getComponentArray,
        assertEntryDisplayedFn,
        keyPropertyForAbsenceCheck,
        sectionName,
      } = testCase;
      it(`Should open the ${sectionName.toLowerCase()} dialog and add an entry when the dialog returns data`, async () => {
        matDialogSpy.mockReturnValue({ afterClosed: () => of(entryData) });
        const addButton = screen.getByTestId(addButtonTestId);
        await user.click(addButton);
        expect(matDialogSpy).toHaveBeenCalledTimes(1);
        componentFixture.detectChanges();

        await (assertEntryDisplayedFn as (data: Education | WorkExperience) => Promise<void>)(entryData);

        const currentArrayValue = getComponentArray();
        expect(currentArrayValue).toContainEqual(entryData);
      });

      it(`Should not add data if the ${sectionName.toLowerCase()} dialog is canceled (returns null)`, async () => {
        matDialogSpy.mockReturnValue({ afterClosed: () => of(null) });
        const initialLength = getComponentArray().length;
        const addButton = screen.getByTestId(addButtonTestId);
        await user.click(addButton);
        expect(matDialogSpy).toHaveBeenCalledTimes(1);
        componentFixture.detectChanges();
        const currentArrayValue = getComponentArray();
        expect(currentArrayValue.length).toBe(initialLength);
        const uniqueTextFromEntry = (entryData as any)[keyPropertyForAbsenceCheck];
        expect(screen.queryByText(uniqueTextFromEntry)).toBeNull();
      });
    }
  );

  describe('Should display correct translations in the screen: ', () => {
    const translationTestCases = [{ key: 'summaryRegisterTitle' }, { key: 'introduction' }];
    translationTestCases.forEach(({ key }) => {
      it(`${key}`, async () => {
        testTranslationByText(key);
      });
    });
  });
});
