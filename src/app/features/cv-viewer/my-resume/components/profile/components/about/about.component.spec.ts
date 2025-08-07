import { render, screen } from '@testing-library/angular';
import { AboutComponent } from './about.component';
import { mockAbout } from './mocks/about.mock';

const renderComponent = async () => {
  await render(AboutComponent, {
    inputs: {
      aboutSet: mockAbout,
    },
  });
  const items = await screen.findAllByTestId(/detail-item-/);
  expect(items.length).toBe(7);
};

describe(AboutComponent.name, () => {
  beforeEach(async () => {
    await renderComponent();
  });

  it('should display profile description', () => {
    expect(screen.getByTestId('description')).toHaveTextContent(mockAbout.description);
  });

  it('should display profile text', () => {
    expect(screen.getByTestId('about-tittle')).toHaveTextContent(mockAbout.text);
  });

  it('should display profile hobbies', () => {
    expect(screen.getByTestId('hobbies')).toHaveTextContent(mockAbout.hobbies);
  });

  it('should render all detail items correctly', () => {
    expect(screen.getByTestId('detail-item-birthday')).toHaveTextContent(mockAbout.birthday);
    expect(screen.getByTestId('detail-item-website')).toHaveTextContent(mockAbout.website);
    expect(screen.getByTestId('detail-item-phoneNumber')).toHaveTextContent(mockAbout.phoneNumber.toString());
    expect(screen.getByTestId('detail-item-city')).toHaveTextContent(mockAbout.city);
    expect(screen.getByTestId('detail-item-age')).toHaveTextContent(mockAbout.age.toString());
    expect(screen.getByTestId('detail-item-degree')).toHaveTextContent(mockAbout.degree);
    expect(screen.getByTestId('detail-item-email')).toHaveTextContent(mockAbout.email);
  });

  it('should display profile work experience', () => {
    expect(screen.getByTestId('workExperience')).toHaveTextContent(mockAbout.workExperience);
  });
});

describe(AboutComponent.name, () => {
  it('handles undefined correctly', async () => {
    await render(AboutComponent, {
      inputs: {
        aboutSet: undefined,
      },
    });

    expect(screen.getByTestId('about')).toBeEmptyDOMElement();
  });
});
