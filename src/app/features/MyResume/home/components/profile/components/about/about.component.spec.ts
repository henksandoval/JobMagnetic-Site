import '@angular/localize/init';
import { render, screen } from '@testing-library/angular';
import { AboutComponent } from './about.component';
import { mockAbout } from './mocks/about.mock';

const renderComponent = async () => {
  await render(AboutComponent, {
    inputs: {
      aboutSet: mockAbout,
    },
  });
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

  it('should display profile birthday', () => {
    expect(screen.getByTestId('birthday')).toHaveTextContent(mockAbout.birthday);
  });

  it('should display profile website', () => {
    expect(screen.getByTestId('website')).toHaveTextContent(mockAbout.website);
  });

  it('should display profile phone number', () => {
    expect(screen.getByTestId('phoneNumber')).toHaveTextContent(mockAbout.phoneNumber.toString());
  });

  it('should display profile city', () => {
    expect(screen.getByTestId('city')).toHaveTextContent(mockAbout.city);
  });

  it('should display profile age', () => {
    expect(screen.getByTestId('age')).toHaveTextContent(mockAbout.age.toString());
  });

  it('should display profile degree', () => {
    expect(screen.getByTestId('degree')).toHaveTextContent(mockAbout.degree);
  });

  it('should display profile email', () => {
    expect(screen.getByTestId('email')).toHaveTextContent(mockAbout.email);
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
