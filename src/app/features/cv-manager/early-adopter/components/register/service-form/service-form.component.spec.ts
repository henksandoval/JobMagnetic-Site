import { ServiceFormComponent } from './service-form.component';
import { render, screen } from '@testing-library/angular';
import '@testing-library/jest-dom';
import '@angular/localize/init';
import { ServiceBase } from '../models/serviceBase.model';
import userEvent from '@testing-library/user-event';
import { ReactiveFormsModule } from '@angular/forms';

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
      imports: [ReactiveFormsModule],
    });
    fixture.detectChanges();
  });

  it('It should show the title of', async () => {
    expect(screen.getByTestId('serviceData')).toHaveTextContent('Step 6: Service Data');
  });

  const setEducationEntrie = async (serviceBase: ServiceBase) => {
    const overviewInput = screen.getByTestId('inputOverview');

    await user.type(overviewInput, serviceBase.overview);

    expect(overviewInput).toHaveValue(serviceBase.overview);
  };

  describe('I should add data in Overview', () => {
    it('Must display in data view', async () => {
      const overview = overviewEntrie;
      await setEducationEntrie(overview);
    });
  });
});
