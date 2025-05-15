import { ServiceFormComponent } from './service-form.component';
import { render, screen } from '@testing-library/angular';
import '@testing-library/jest-dom';
import '@angular/localize/init';
import translations from '../../../../../../../assets/i18n/messages.json';
import { ServiceBase } from '../models/serviceBase.model';
import userEvent from '@testing-library/user-event';
import { ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

const overviewEntrie: ServiceBase = {
  overview: 'overview',
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
  let componentFixture: ComponentFixture<ServiceFormComponent>;

  beforeEach(async () => {
    const { fixture } = await render(ServiceFormComponent, {
      imports: [ReactiveFormsModule],
    });
    componentFixture = fixture;
  });

  it('It should show the title of', async () => {
    expect(screen.getByTestId('serviceData')).toHaveTextContent('Step 6: Service Data');
  });

  describe('I should add data in Overview', () => {
    it('Must display in data view', () => {
      const overview = overviewEntrie.overview;
      await setEducationEntrie(overview);

    });

    const setEducationEntrie = async (serviceBase: ServiceBase) => {
      const overviewInput = screen.getByTestId('inputOverview');


    };
  });

});
