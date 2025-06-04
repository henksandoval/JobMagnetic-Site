import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './features/cv-viewer/page-not-found/page-not-found.component';
import { MyResumeComponent } from './features/cv-viewer/my-resume/my-resume.component';

export const routes: Routes = [
  {
    path: 'cv-manager',
    loadChildren: () => import('./features/cv-manager/cv-manager.routes').then((m) => m.cvManagerRoutes),
  },
  {
    path: ':username',
    component: MyResumeComponent,
  },
  {
    path: '',
    redirectTo: 'cv-manager',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
