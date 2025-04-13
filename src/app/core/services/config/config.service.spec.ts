import { TestBed } from '@angular/core/testing';
import { ConfigService } from '@core/services/config/config.service';
import { Config } from '@core/services/config/interfaces/config';

describe(ConfigService.name, () => {
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigService]
    });
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get config correctly', () => {
    const mockConfig: Config = {
      apiUrl: 'https://example.com',
      theme: 'dark',
      enableLogs: false,
      language: 'en'
    };

    service.setConfig(mockConfig);
    const retrievedConfig = service.getConfig();

    expect(retrievedConfig).toEqual(mockConfig);
    expect(service.isConfigLoaded()).toEqual(true);
  });


  it('should return undefined if config is not set', () => {
    const retrievedConfig = service.getConfig();
    expect(retrievedConfig).toBeUndefined();
  });
});
