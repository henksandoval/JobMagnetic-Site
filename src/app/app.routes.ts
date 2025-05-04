import { Routes } from '@angular/router';
import { myResumeRoutes } from './features/cv-viewer/my-resume/myResumeRoutes';
import { cvManagerRoutes } from './features/cv-manager/cv-manager.routes';
import { PageNotFoundComponent } from './features/cv-viewer/page-not-found/page-not-found.component';

export const routes: Routes = [
  ...cvManagerRoutes,
  {
    path: 'early-adopter', loadChildren: () => import('./features/cv-manager/cv-manager.routes').then(m => m.cvManagerRoutes),
  },
  ...myResumeRoutes,
  {
    path: '',
    redirectTo: '/my-resume/john',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
