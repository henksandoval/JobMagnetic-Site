import { MyResumeComponent } from './my-resume.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { HeaderComponent } from './layouts/header/header.component';
import { CoverComponent } from './components/cover/cover.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { StateService } from '@core/services/state/state.service';

describe(MyResumeComponent.name, () => {
  let fixture: MockedComponentFixture<MyResumeComponent>;

  beforeEach(() => {
    return MockBuilder(MyResumeComponent)
      .mock(HeaderComponent)
      .mock(CoverComponent)
      .mock(ProfileComponent)
      .mock(FooterComponent)
      .mock(AppIdDirective)
      .provide([
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => 'testUser' }),
          },
        },
        {
          provide: StateService,
          useValue: { userName: { set: jest.fn() } },
        },
      ]);
  });

  beforeEach(() => {
    fixture = MockRender(MyResumeComponent);
    jest.spyOn(document.head, 'appendChild');
    jest.spyOn(document.body, 'appendChild');
  });

  it('should create the component', async () => {
    expect(fixture.point.componentInstance).toBeTruthy();
  });

  it('should set the username from the route', () => {
    const stateService = fixture.point.injector.get(StateService);
    expect(stateService.userName.set).toHaveBeenCalledWith('testUser');
  });
});
