import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@core/services/http/http.service';
import { ConfigService } from '@core/services/config/config.service';
import { Config } from '@core/services/config/interfaces/config';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly config: Config = inject(ConfigService).getConfig();
  private readonly http = inject(HttpService);

  saveData<T>(urlPath: string, data: T): Observable<T> {
    const url = new URL(this.config.apiUrl, urlPath);
    return this.http.post<T, T>(url, data);
  }
}
