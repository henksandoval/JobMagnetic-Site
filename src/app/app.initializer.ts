import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { ConfigService } from '@core/services/config/config.service';
import { parseDTO } from '@core/services/config/interfaces/config';
import { HttpService } from '@core/services/http/http.service';

export const initializeApp = () => {
  const httpService = inject(HttpService);
  const configService = inject(ConfigService);
  const url = './config/config.json';

  httpService.get(url).pipe(
    tap((configData) => {
      const dto = parseDTO(configData);
      if (dto.success) {
        configService.setConfig(dto.data);
      } else {
        console.error('Invalid config.json', dto.error);
      }
    }),
    catchError((error) => {
      console.error('Error loading config.json', error);
      return throwError(() => new Error('Error loading config.json', error));
    })
  ).subscribe();
};
