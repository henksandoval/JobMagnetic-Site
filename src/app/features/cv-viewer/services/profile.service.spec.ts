import { MockBuilder, MockInstance, ngMocks } from 'ng-mocks';
import { ProfileService } from './profile.service';
import { HttpService } from '@core/services/http/http.service';
import { ConfigService } from '@core/services/config/config.service';
import { of, throwError } from 'rxjs';
import { mockProfile } from '../my-resume/components/profile/mocks/profile.mock';
import { mockProfileContract } from '../my-resume/components/profile/mocks/profile-contract.mock';
import { Config } from '@core/services/config/interfaces/config';
import { StateService } from '@core/services/state/state.service';
import { signal } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

describe(ProfileService.name, () => {
  beforeEach(async () => {
    const config: Config = {
      useAPI: true,
      apiUrl: 'https://api.example.com',
    };

    await MockBuilder(ProfileService)
      .mock(HttpService)
      .mock(ConfigService)
      .mock(StateService);

    MockInstance(HttpService, (instance) => {
      jest.spyOn(instance, 'get').mockReturnValue(of(mockProfileContract));
    });
    MockInstance(ConfigService, (instance) => {
      jest.spyOn(instance, 'getConfig').mockReturnValue(config);
    });
    MockInstance(StateService, (instance) => {
      instance.slug = signal('test-slug');
    });
  });

  it('should be created', () => {
    const service = ngMocks.findInstance(ProfileService);
    expect(service).toBeTruthy();
  });

  it('should load profile details successfully', fakeAsync(() => {
    const service = ngMocks.findInstance(ProfileService);
    const httpService = ngMocks.findInstance(HttpService);

    TestBed.flushEffects();
    tick();

    const profile = service.profile$();
    expect(profile).toEqual(mockProfile);
    expect(httpService.get).toHaveBeenCalledTimes(1);
  }));

  it('should handle error when loading profile', fakeAsync(() => {
    MockInstance(HttpService, (instance) => {
      jest.spyOn(instance, 'get').mockReturnValue(throwError(() => new Error('Network error')));
    });

    const service = ngMocks.findInstance(ProfileService);
    const httpService = ngMocks.findInstance(HttpService);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    TestBed.flushEffects();
    tick();

    const response = service.profile$();

    expect(response).toBeUndefined();
    expect(httpService.get).toHaveBeenCalledTimes(1);
    consoleErrorSpy.mockRestore();
  }));
});
