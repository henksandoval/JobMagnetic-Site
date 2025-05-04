import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './features/cv-viewer/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'cv-manager',
    loadChildren: () =>
      import('./features/cv-manager/cv-manager.routes').then((m) => m.cvManagerRoutes),
  },
  {
    path: 'cv-viewer',
    loadChildren: () =>
      import('./features/cv-viewer/cv-viewer.routes').then((m) => m.cvViewerRoutes),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
