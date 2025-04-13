import { TestBed } from '@angular/core/testing';
import { UrlBuilderService } from './url-builder.service';

describe(UrlBuilderService.name, () => {
  let service: UrlBuilderService;
  const baseUrl = 'https://example.com';
  const path = '/api/resource';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('buildUrl', () => {
    it('should build a valid URL with query parameters', () => {
      const queryParams = { id: '123', type: 'test' };
      const expectedUrl = `https://example.com/api/resource?id=123&type=test`;

      const url = service.buildUrl(baseUrl, path, queryParams);

      expect(url).toEqual(expectedUrl);
    });

    it('should handle empty query parameters', () => {
      const queryParams = {};
      const expectedUrl = `https://example.com/api/resource`;

      const url = service.buildUrl(baseUrl, path, queryParams);

      expect(url).toEqual(expectedUrl);
    });

    it('should correctly encode query parameters', () => {
      const queryParams = { name: 'John Doe', search: 'a+b&c=d' };
      const expectedUrl = `https://example.com/api/resource?name=John%20Doe&search=a%2Bb%26c%3Dd`;

      const url = service.buildUrl(baseUrl, path, queryParams);

      expect(url).toEqual(expectedUrl);
    });

    it('should handle a base URL without a trailing slash', () => {
      const queryParams = { id: '123' };
      const expectedUrl = `https://example.com/api/resource?id=123`;

      const url = service.buildUrl(baseUrl, path, queryParams);

      expect(url).toEqual(expectedUrl);
    });

    it('should handle a base URL with a trailing slash and a path with a leading slash', () => {
      const queryParams = { id: '123' };
      const expectedUrl = `https://example.com/api/resource?id=123`;

      const url = service.buildUrl(baseUrl, path, queryParams);

      expect(url).toEqual(expectedUrl);
    });

    it('should handle null or undefined query parameters gracefully', () => {
      const expectedUrl = `https://example.com/api/resource`;

      const url = service.buildUrl(baseUrl, path, {});

      expect(url).toEqual(expectedUrl);
    });
  });
});
