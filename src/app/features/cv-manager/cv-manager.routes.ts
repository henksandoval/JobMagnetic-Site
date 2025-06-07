import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { CvManagerComponent } from './cv-manager.component';
import { IndexComponent } from './components/index/index.component';

export const cvManagerRoutes: Routes = [
  {
    path: '',
    component: CvManagerComponent,
    children: [
      { path: 'index', component: IndexComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
];
