import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@core/services/config/config.service';
import { parseDTO } from '@core/services/config/interfaces/config';

export const initializeApp = async () => {
  const httpClient = inject(HttpClient);
  const configService = inject(ConfigService);
  const url = './config/config.json';

  try {
    const config = await lastValueFrom(httpClient.get(url));
    const dto = parseDTO(config);
    if (dto.success) {
      configService.setConfig(dto.data);
    } else {
      console.error('Invalid config.json', dto.error);
    }
  } catch (error) {
    console.error('Error loading config.json', error);
  }
};
