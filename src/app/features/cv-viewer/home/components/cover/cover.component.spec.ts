import { CoverComponent } from './cover.component';
import { render } from '@testing-library/angular';
import { ProfileService } from '../../services/profile.service';
import { mockProfile } from '../profile/mocks/profile.mock';

jest.useFakeTimers();

const mockProfileService = {
  profile$: jest.fn().mockReturnValue(mockProfile),
};

describe(CoverComponent.name, () => {
  let componentInstance: CoverComponent;

  beforeEach(async () => {
    const { fixture } = await render(CoverComponent, {
      providers: [{ provide: ProfileService, useValue: mockProfileService }],
    });
    componentInstance = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(componentInstance).toBeTruthy();
  });

  it('should type professions in intervals', () => {
    jest.advanceTimersByTime(1000);
    expect(componentInstance.currentProfession$()).toBe('');
    jest.advanceTimersByTime(2750);
    expect(componentInstance.currentProfession$()).toBe('Developer');
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    jest.advanceTimersByTime(1000);
    const professionSubscription = componentInstance['professionSubscription'];
    const typeProfessionSubscription = componentInstance['typeProfessionSubscription'];
    componentInstance.ngOnDestroy();
    expect(professionSubscription?.closed).toBeTruthy();
    expect(typeProfessionSubscription?.closed).toBeTruthy();
  });
});
