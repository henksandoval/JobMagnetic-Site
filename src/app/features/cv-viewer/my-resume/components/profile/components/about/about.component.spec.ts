import { render, screen } from '@testing-library/angular';
import { AboutComponent } from './about.component';
import { mockAbout } from './mocks/about.mock';

describe(AboutComponent.name, () => {
  const renderComponent = async (aboutInput: typeof mockAbout | undefined = mockAbout) => {
    await render(AboutComponent, {
      inputs: { aboutSet: aboutInput },
    });
  };

  describe('with valid about input', () => {
    beforeEach(async () => {
      await renderComponent();
    });

    it('should render description, text, hobbies, and work experience', () => {
      expect(screen.getByTestId('description')).toHaveTextContent(mockAbout.description);
      expect(screen.getByTestId('about-tittle')).toHaveTextContent(mockAbout.text);
      expect(screen.getByTestId('hobbies')).toHaveTextContent(mockAbout.hobbies);
      expect(screen.getByTestId('workExperience')).toHaveTextContent(mockAbout.workExperience);
    });

    it('should display all valid details from about object', () => {
      const expectedDetails = [
        { testId: 'birthday', value: mockAbout.birthday },
        { testId: 'website', value: mockAbout.website },
        { testId: 'phoneNumber', value: mockAbout.phoneNumber.toString() },
        { testId: 'city', value: mockAbout.city },
        { testId: 'age', value: mockAbout.age.toString() },
        { testId: 'degree', value: mockAbout.degree },
        { testId: 'email', value: mockAbout.email },
      ];

      expectedDetails.forEach(({ testId, value }) => {
        expect(screen.getByTestId(testId)).toHaveTextContent(value);
      });
    });
  });

  it('should display the default image if no imageUrl is provided', async () => {
    const defaultImage = '/img/profile_picture.jpg';

    const mockAboutWithoutImage: typeof mockAbout = {
      ...mockAbout,
      imageUrl: '',
    };

    await render(AboutComponent, {
      inputs: {
        aboutSet: mockAboutWithoutImage,
      },
    });

    expect(screen.getByTestId('profilePicture')).toHaveAttribute('src', defaultImage);
  });
});
