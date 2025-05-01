import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './account/register/register.component';
import { IndexComponent } from './account/index/index.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      {
        path: 'index', component: IndexComponent
      },
      { path: 'register', component: RegisterComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes), IndexComponent, RegisterComponent],
  exports: [RouterModule],
})
export class AdminRoutes {}
