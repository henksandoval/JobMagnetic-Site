import { Routes } from '@angular/router';
import { homeRoutes } from './features/cv-viewer/home/home.routes';
import { adminRoutes } from './features/cv-manager/early-adopter/admin.routes';
import { PageNotFoundComponent } from './features/cv-viewer/page-not-found/page-not-found.component';

export const routes: Routes = [
  ...adminRoutes,
  {
    path: 'early-adopter', loadChildren: () => import('./features/cv-manager/early-adopter/admin.routes').then(m => m.adminRoutes),
  },
  ...homeRoutes,
  {
    path: '',
    redirectTo: '/home/john',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
