import { HomeComponent } from './home.component';
import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { HeaderComponent } from '../layouts/header/header.component';
import { CoverComponent } from './components/cover/cover.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from '../layouts/footer/footer.component';
import { AppIdDirective } from '@core/directives/app-id/app-id.directive';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { StateService } from '@core/services/state/state.service';

describe(HomeComponent.name, () => {
  let fixture: MockedComponentFixture<HomeComponent>;

  beforeEach(() => {
    return MockBuilder(HomeComponent)
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
    fixture = MockRender(HomeComponent);
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

  it('should load scripts and styles', async () => {
    const scripts = [
      'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.min.js',
      'js/main.js',
    ];
    const styles = [
      'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/font/bootstrap-icons.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/boxicons/2.1.4/css/boxicons.min.css',
    ];

    scripts.forEach((src) => {
      expect(document.body.innerHTML).toContain(src);
    });

    styles.forEach((href) => {
      expect(document.head.innerHTML).toContain(href);
    });
  });
});
