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
      await assertServiceGalleryItems(overview.galleryItems);
    });

    it('should add multiple galleryItems', async () => {
      for (const galleryItem of overviewEntrie.galleryItems) {
        await assertServiceGalleryItems([galleryItem]);
      }
    });
  });

  const setServiceEntrie = async (serviceBase: ServiceBase) => {
    const overviewInput = screen.getByTestId('inputOverview');
    await user.type(overviewInput, serviceBase.overview);
    expect(overviewInput).toHaveValue(serviceBase.overview);
    const addButton = screen.getByTestId('btnAddServiceData');
    await user.click(addButton);
  };

  const assertServiceGalleryItems = async (serviceBase: ServiceBase['galleryItems']) => {
    const saveButton = screen.getByTestId('btnSaveServiceData');
    const positionInput = screen.getByTestId('inputPosition');
    const inputTitle = screen.getByTestId('inputTitle');
    const inputDescription = screen.getByTestId('inputDescription');
    const inputUrlLink = screen.getByTestId('inputUrlLink');
    const inputUrlImage = screen.getByTestId('inputUrlImage');
    const inputUrlVideo = screen.getByTestId('inputUrlVideo');
    const inputType = screen.getByTestId('inputType');

    await user.type(positionInput, serviceBase[0].position.toString());
    await user.type(inputTitle, serviceBase[0].title);
    await user.type(inputDescription, serviceBase[0].description);
    await user.type(inputUrlLink, serviceBase[0].urlLink);
    await user.type(inputUrlImage, serviceBase[0].urlImage);
    await user.type(inputUrlVideo, serviceBase[0].urlVideo);
    await user.type(inputType, serviceBase[0].type);

    await userEvent.click(saveButton);
  };
});
