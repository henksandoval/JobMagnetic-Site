import { Injectable } from '@angular/core';
import { Config } from './interfaces/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config!: Config;
  private configLoaded = false;

  setConfig(config: Config) {
    this.config = config;
    this.configLoaded = true;
  }

  getConfig() {
    return this.config;
  }

  isConfigLoaded() {
    return this.configLoaded;
  }
}
