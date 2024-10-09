import { render, screen } from '@testing-library/angular';
import { ServicesComponent } from './services.component';
import { mockProfile } from '../../mocks/mockProfile';
import { ServiceDetails } from './service';
import { mockService } from './mockService';
import '@testing-library/jest-dom';
import '@angular/localize/init';

const renderComponent = async () => {
  await render(ServicesComponent, {
    inputs: {
      serviceSet: mockService,
    },
  });
};

describe('ServicesComponent', () => {
  beforeEach(async () => {
    await renderComponent();
  });

  it('It should show overview in the view', () => {
    expect(screen.getByTestId('overview')).toHaveTextContent(mockProfile.service.overview);
  });

  it('It should show the list of services', () => {
    mockProfile.service.serviceDetails.forEach((serviceDetails: ServiceDetails, index: number) => {
      const id: string = (++index).toString().padStart(2, '0');
      expect(screen.getByTestId('name_' + id)).toHaveTextContent(serviceDetails.name);
      expect(screen.getByTestId('description_' + id)).toHaveTextContent(serviceDetails.description);
      expect(screen.getByTestId('backgroundUrl_' + id)).toHaveAttribute('src', serviceDetails.backgroundUrl);
    });
  });
});

describe('ServicesComponentNullScenary', () => {
  it('handles undefined correctly', async () => {
    await render(ServicesComponent, {
      inputs: {
        serviceSet: undefined,
      },
    });

    expect(screen.getByTestId('services')).toBeEmptyDOMElement();
  });
});
