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
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { ProfileService } from '../services/profile.service';

describe(MyResumeComponent.name, () => {
  let fixture: MockedComponentFixture<MyResumeComponent>;
  const mockProfileService = {
    profile$: signal(null),
    loadProfileBySlug: jest.fn(),
  };

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
          useValue: { slug: { set: jest.fn() } },
        },
        {
          provide: ProfileService,
          useValue: mockProfileService,
        },
        provideHttpClient(),
        provideHttpClientTesting(),
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

  it('should set the slug from the route', () => {
    const stateService = fixture.point.injector.get(StateService);
    expect(stateService.slug.set).toHaveBeenCalledWith('testUser');
  });
});
