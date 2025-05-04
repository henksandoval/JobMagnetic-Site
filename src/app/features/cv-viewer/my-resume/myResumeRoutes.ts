import { Routes } from '@angular/router';
import { MyResumeComponent } from './my-resume.component';

export const myResumeRoutes: Routes = [
  {
    path: 'my-resume/:username',
    component: MyResumeComponent,
  },
];
