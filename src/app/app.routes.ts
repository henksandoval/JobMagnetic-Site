import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './features/cv-viewer/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'cv-manager',
    loadChildren: () => import('./features/cv-manager/cv-manager.routes').then((m) => m.cvManagerRoutes),
  },
  {
    path: 'cv-viewer',
    loadChildren: () => import('./features/cv-viewer/cv-viewer.routes').then((m) => m.cvViewerRoutes),
  },
  {
    path: 'early-adopter',
    loadChildren: () => import('./features/early-adopter/early-adopter.routes').then((m) => m.earlyAdopterRoutes),
  },
  {
    path: 'early-access',
    loadChildren: () => import('./features/early-access/early-access.routes').then((m) => m.earlyAccessRoutes),
  },
  {
    path: 'landing-page',
    loadChildren: () => import('./features/landing-page/landing-page.routes').then((m) => m.landingPageRoutes),
  },
  {
    path: '',
    redirectTo: 'landing-page',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
