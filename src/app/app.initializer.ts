import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@core/services/config/config.service';
import { parseDTO } from '@core/services/config/interfaces/config';
import { HttpService } from '@core/services/http/http.service';

export const initializeApp = async () => {
  const httpService = inject(HttpService);
  const configService = inject(ConfigService);
  const url = './config/config.json';

  if (configService.isConfigLoaded()) {
    return;
  }

  try {
    const configData = await firstValueFrom(httpService.get(url));
    const dto = parseDTO(configData);

    if (dto.success) {
      configService.setConfig(dto.data);
    } else {
      console.error('Invalid config.json', dto.error);
    }
  } catch (error) {
    console.error('Error loading config.json', error);
    throw new Error('Error loading config.json');
  }
};
