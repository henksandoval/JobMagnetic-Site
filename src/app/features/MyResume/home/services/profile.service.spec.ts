import { MockBuilder, MockInstance, ngMocks } from 'ng-mocks';
import { ProfileService } from './profile.service';
import { HttpService } from '@core/services/http/http.service';
import { ConfigService } from '@core/services/config/config.service';
import { of, throwError } from 'rxjs';
import { mockProfile } from '../components/profile/mocks/profile.mock';
import { mockProfileContract } from '../components/profile/mocks/profile-contract.mock';
import { Config } from '@core/services/config/interfaces/config';

describe(ProfileService.name, () => {
  MockInstance.scope('case');

  beforeEach(async () => {
    const config: Config = {
      apiUrl: 'https://api.example.com'
    };

    await MockBuilder(ProfileService).mock(HttpService);
    await MockBuilder(ProfileService).mock(ConfigService);

    MockInstance(HttpService, (instance) => {
      jest.spyOn(instance, 'get').mockReturnValue(of(mockProfileContract));
    });
    MockInstance(ConfigService, (instance) => {
      jest.spyOn(instance, 'getConfig').mockReturnValue(config);
    });
  });

  it('should be created', () => {
    const service = ngMocks.findInstance(ProfileService);
    expect(service).toBeTruthy();
  });

  it('should load profile details successfully', () => {
    const service = ngMocks.findInstance(ProfileService);
    const httpService = ngMocks.findInstance(HttpService);

    const profile = service.profile$();

    expect(profile).toEqual(mockProfile);
    expect(httpService.get).toHaveBeenCalledTimes(1);
  });

  it('should handle error when loading profile', () => {
    MockInstance(HttpService, (instance) => {
      jest.spyOn(instance, 'get').mockReturnValue(throwError(() => new Error('Network error')));
    });

    const service = ngMocks.findInstance(ProfileService);
    const httpService = ngMocks.findInstance(HttpService);

    const response = service.profile$();

    expect(response).toBeUndefined();
    expect(httpService.get).toHaveBeenCalledTimes(1);
  });
});
