import { Routes } from '@angular/router';
import { MyResumeComponent } from './my-resume.component';

export const myResumeRoutes: Routes = [
  {
    path: 'my-resume',
    redirectTo: 'my-resume/john-doe-44d5c7',
    pathMatch: 'full',
  },
  {
    path: 'my-resume/:slug',
    component: MyResumeComponent,
  },
];
