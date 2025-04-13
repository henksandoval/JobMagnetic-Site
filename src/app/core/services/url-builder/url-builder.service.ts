import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlBuilderService {
  buildUrl(baseUrl: string, path: string, queryParams: Record<string, string>): string {
    const url = new URL(path, baseUrl);

    const queryEntries = Object.entries(queryParams);

    if (queryEntries.length > 0) {
      url.search = queryEntries
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    }

    return url.toString();
  }
}
