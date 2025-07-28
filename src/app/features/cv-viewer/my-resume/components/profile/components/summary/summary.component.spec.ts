import { SummaryComponent } from './summary.component';
import { render, screen } from '@testing-library/angular';
import { mockSummary } from './mocks/summary.mock';
import { AcademicBackground } from './interfaces/academic-background';
import { Position } from './interfaces/position';

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
    screen.debug();
    mockSummary.education.academicBackground.forEach(
      (academicBackground: AcademicBackground, index: number) => {
        const id: string = (++index).toString().padStart(2, '0');
        expect(screen.getByTestId('experience_' + id)).toHaveTextContent(academicBackground.experience);
        expect(screen.getByTestId('startDate_' + id)).toHaveTextContent(academicBackground.rangeDate);
        expect(screen.getByTestId('academy_' + id)).toHaveTextContent(academicBackground.academy);
        expect(screen.getByTestId('description_' + id)).toHaveTextContent(academicBackground.description);
      }
    );
  });

  it('should render all records about work experience', () => {
    mockSummary.workExperience.position.forEach((position: Position, index: number) => {
      const id: string = (++index).toString().padStart(2, '0');
      expect(screen.getByTestId('specialist_' + id)).toHaveTextContent(position.specialist);
      expect(screen.getByTestId('startDate_' + id)).toHaveTextContent(position.startDate);
      expect(screen.getByTestId('location_' + id)).toHaveTextContent(position.location);
    });
  });
});
