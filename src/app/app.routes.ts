import { Routes } from '@angular/router';
import { myResumeRoutes } from './features/cv-viewer/my-resume/myResumeRoutes';
import { PageNotFoundComponent } from './features/cv-viewer/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'cv-manager',
    loadChildren: () =>
      import('./features/cv-manager/cv-manager.routes').then((m) => m.cvManagerRoutes),
  },
  ...myResumeRoutes,
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
