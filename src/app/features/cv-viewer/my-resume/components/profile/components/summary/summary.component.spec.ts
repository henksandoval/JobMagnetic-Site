import { SummaryComponent } from './summary.component';
import { render, screen } from '@testing-library/angular';
import { mockSummary } from './mocks/summary.mock';
import { AcademicBackground } from './interfaces/academic-background';
import { Position } from './interfaces/position';
import '@angular/localize/init';

const renderComponent = async () => {
  await render(SummaryComponent, {
    inputs: {
      summarySet: mockSummary,
    },
  });
};

describe(SummaryComponent.name, () => {
  beforeEach(async () => {
    await renderComponent();
  });

  it('should show the introduction', () => {
    expect(screen.getByTestId('introduction')).toHaveTextContent(mockSummary.introduction);
  });

  it('should get all the records about education.', () => {
    mockSummary.education.academicBackground.forEach(
      (academicBackground: AcademicBackground, index: number) => {
        const id: string = (++index).toString().padStart(2, '0');
        expect(screen.getByTestId('experience_' + id)).toHaveTextContent(academicBackground.experience);
        expect(screen.getByTestId('startDate-date' + id)).toHaveTextContent(academicBackground.startDate);
        expect(screen.getByTestId('academy-formation' + id)).toHaveTextContent(academicBackground.Academy);
        expect(screen.getByTestId('description_' + id)).toHaveTextContent(academicBackground.description);
      }
    );
  });

  it('should render all records about work experience', () => {
    mockSummary.workExperience.position.forEach((position: Position, index: number) => {
      const id: string = (++index).toString().padStart(2, '0');
      expect(screen.getByTestId('specialist_' + id)).toHaveTextContent(position.specialist);
      expect(screen.getByTestId('startDate_' + id)).toHaveTextContent(position.startdate);
      expect(screen.getByTestId('location_' + id)).toHaveTextContent(position.location);
      expect(screen.getByTestId('communicationDesignLeadership_' + id)).toHaveTextContent(
        position.communicationDesignLeadership
      );
      expect(screen.getByTestId('teamLeadership_' + id)).toHaveTextContent(position.teamLeadership);
      expect(screen.getByTestId('designQualityAssurance_' + id)).toHaveTextContent(
        position.designQualityAssurance
      );
      expect(screen.getByTestId('expertiseArea_' + id)).toHaveTextContent(position.expertiseArea);
    });
  });
});

describe(SummaryComponent.name, () => {
  it('handles undefined correctly', async () => {
    await render(SummaryComponent, {
      inputs: {
        summarySet: undefined,
      },
    });

    expect(screen.getByTestId('summary')).toBeEmptyDOMElement();
  });
});
