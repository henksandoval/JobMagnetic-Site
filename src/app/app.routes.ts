import { Routes } from '@angular/router';
import { homeRoutes } from './features/MyResume/home/home.routes';
import { adminRoutes } from './features/MyResume/admin/admin.routes';
import { PageNotFoundComponent } from './features/MyResume/page-not-found/page-not-found.component';

export const routes: Routes = [
  ...adminRoutes,
  {
    path: 'admin', loadChildren: () => import('./features/MyResume/admin/admin.routes').then(m => m.adminRoutes),
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
