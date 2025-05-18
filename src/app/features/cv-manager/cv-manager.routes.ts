import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { RegisterComponent } from './components/register/register.component';

export const cvManagerRoutes: Routes = [
  { path: '', component: IndexComponent, },
  { path: 'register', component: RegisterComponent },
];
