import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { routes } from './app.routes';
import { initializeApp } from './app.initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideAppInitializer(initializeApp),
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(CarouselModule, NgxPageScrollModule),
  ],
};
