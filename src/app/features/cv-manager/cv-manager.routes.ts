import { Routes } from '@angular/router';
import { EarlyAdopterComponent } from '../early-adopter/early-adopter.component';
import { IndexComponent } from './components/index/index.component';
import { RegisterComponent } from './components/register/register.component';

export const cvManagerRoutes: Routes = [
  {
    path: 'early-adopter',
    component: EarlyAdopterComponent,
    children: [
      { path: '', component: IndexComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
];
