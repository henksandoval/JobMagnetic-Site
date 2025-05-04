import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@core/services/http/http.service';
import { ConfigService } from '@core/services/config/config.service';
import { Config } from '@core/services/config/interfaces/config';
import { ApiEndpoints } from '../../../../api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly config: Config = inject(ConfigService).getConfig();
  private readonly http = inject(HttpService);
  getEndpoints() {
    return ApiEndpoints;
  }

  saveData<T>(Url: string, data: T): Observable<T> {
    const url = new URL(this.config.apiUrl, Url);
    return this.http.post<T, T>(url, data);
  }
}
