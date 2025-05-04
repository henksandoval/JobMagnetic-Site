import { RouterModule, Routes } from '@angular/router';
import { EarlyAdopterComponent } from './early-adopter/early-adopter.component';
import { NgModule } from '@angular/core';
import { IndexComponent } from './early-adopter/components/index/index.component';
import { RegisterComponent } from './early-adopter/components/register/register.component';

export const cvManagerRoutes: Routes = [
  {
    path: '',
    component: EarlyAdopterComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', component: IndexComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cvManagerRoutes), IndexComponent],
  exports: [RouterModule],
})
export class AdminRoutes {}
