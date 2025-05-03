import { Routes } from '@angular/router';
import { homeRoutes } from './features/cv-viewer/home/home.routes';
import { cvManagerRoutes } from './features/cv-manager/cv-manager.routes';
import { PageNotFoundComponent } from './features/cv-viewer/page-not-found/page-not-found.component';

export const routes: Routes = [
  ...cvManagerRoutes,
  {
    path: 'early-adopter', loadChildren: () => import('./features/cv-manager/cv-manager.routes').then(m => m.cvManagerRoutes),
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
