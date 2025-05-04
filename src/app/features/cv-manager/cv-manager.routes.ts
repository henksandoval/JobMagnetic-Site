import { Routes } from '@angular/router';
import { EarlyAdopterComponent } from './early-adopter/early-adopter.component';
import { IndexComponent } from './early-adopter/components/index/index.component';
import { RegisterComponent } from './early-adopter/components/register/register.component';

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
