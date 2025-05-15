import { ServiceFormComponent } from './service-form.component';
import { render, screen } from '@testing-library/angular';
import '@testing-library/jest-dom';
import '@angular/localize/init';
import { ServiceBase } from '../models/serviceBase.model';
import userEvent from '@testing-library/user-event';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterComponent } from '../register.component';

class MockProfileService {
  getConfig = jest.fn();
}

const overviewEntrie: ServiceBase = {
  overview: 'Sample Overview',
  profileId: '1',
  galleryItems: [
    {
      position: 1,
      title: 'Sample Title',
      description: 'Sample Description',
      urlLink: 'http://example.com',
      urlImage: 'http://example.com/image.jpg',
      urlVideo: 'http://example.com/video.mp4',
      type: 'Sample Type',
    },
  ],
};

describe(ServiceFormComponent.name, () => {
  const user = userEvent.setup();
  // let componentFixture: ComponentFixture<ServiceFormComponent>;

  beforeEach(async () => {
    const { fixture } = await render(ServiceFormComponent, {
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: 'ProfileService', useClass: MockProfileService },
        { provide: RegisterComponent, useValue: {} },
      ],
    });
    fixture.detectChanges();
  });

  it('It should show the title of', async () => {
    expect(screen.getByTestId('serviceData')).toHaveTextContent('Step 6: Service Data');
  });

  describe('I should add data in Overview', () => {
    it('Must display in data view', async () => {
      const overview = overviewEntrie;
      await setServiceEntrie(overview);
    });
  });

  const setServiceEntrie = async (serviceBase: ServiceBase) => {
    const overviewInput = screen.getByTestId('inputOverview');
    await user.type(overviewInput, serviceBase.overview);
    expect(overviewInput).toHaveValue(serviceBase.overview);

    await user.click(screen.getByTestId('serviceDataModal'));
  };
});
