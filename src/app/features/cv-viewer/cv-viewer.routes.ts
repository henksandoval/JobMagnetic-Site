import { Routes } from '@angular/router';
import { MyResumeComponent } from './my-resume/my-resume.component';

export const cvViewerRoutes: Routes = [
  {
    path: 'my-resume/:slug',
    component: MyResumeComponent,
  }
];
