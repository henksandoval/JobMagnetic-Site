import { FooterComponent } from './footer.component';
import { render, screen } from '@testing-library/angular';
import { ProfileService } from '../../../services/profile.service';
import { mockProfile } from '../../components/profile/mocks/profile.mock';

const mockProfileService = {
  profile$: jest.fn().mockReturnValue(mockProfile),
};

describe(FooterComponent.name, () => {
  let componentInstance: FooterComponent;

  beforeEach(async () => {
    const { fixture } = await render(FooterComponent, {
      providers: [{ provide: ProfileService, useValue: mockProfileService }],
    });
    componentInstance = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(componentInstance).toBeTruthy();
  });

  it('should have a profile$', () => {
    expect(componentInstance.profile$).toBeDefined();
    expect(componentInstance.profile$()).toEqual(mockProfile);
  });

  it('Must display FullName title', () => {
    expect(screen.getByTestId('footer_name')).toHaveTextContent(mockProfile.personalData.name);
  });
});
