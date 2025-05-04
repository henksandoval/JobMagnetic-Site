import { MockBuilder, MockInstance, ngMocks } from 'ng-mocks';
import { ProfileService } from './profile.service';
import { HttpService } from '@core/services/http/http.service';
import { ConfigService } from '@core/services/config/config.service';
import { of } from 'rxjs';
import { Config } from '@core/services/config/interfaces/config';
import { mockProfileContract } from '../../../cv-viewer/my-resume/components/profile/mocks/profile-contract.mock';

describe(ProfileService.name, () => {
  MockInstance.scope('case');

  beforeEach(async () => {
    const config: Config = {
      useAPI: true,
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
});
