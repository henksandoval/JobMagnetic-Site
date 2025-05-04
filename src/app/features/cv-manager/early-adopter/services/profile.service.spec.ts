import { TestBed } from '@angular/core/testing';
import { ProfileService } from './profile.service';
import { HttpService } from '@core/services/http/http.service';
import { ConfigService } from '@core/services/config/config.service';
import { of } from 'rxjs';
import { Config } from '@core/services/config/interfaces/config';
import { mockProfileContract } from '../../../cv-viewer/my-resume/components/profile/mocks/profile-contract.mock';

class MockHttpService {
  get = jest.fn();
}

class MockConfigService {
  getConfig = jest.fn();
}

describe(ProfileService.name, () => {
  let service: ProfileService;
  let httpService: MockHttpService;
  let configService: MockConfigService;

  const mockConfig: Config = {
    useAPI: true,
    apiUrl: 'https://api.example.com'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileService,
        { provide: HttpService, useClass: MockHttpService },
        { provide: ConfigService, useClass: MockConfigService }
      ]
    });

    service = TestBed.inject(ProfileService);
    httpService = TestBed.inject(HttpService) as unknown as MockHttpService;
    configService = TestBed.inject(ConfigService) as unknown as MockConfigService;

    configService.getConfig.mockReturnValue(mockConfig);
    httpService.get.mockReturnValue(of(mockProfileContract));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
