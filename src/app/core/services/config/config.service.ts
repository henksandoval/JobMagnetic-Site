import { Injectable } from '@angular/core';
import { Config } from './interfaces/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config!: Config;

  setConfig(config: Config) {
    this.config = config;
  }

  getConfig() {
    return this.config;
  }
}
