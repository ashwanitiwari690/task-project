import { AuthGuard } from './auth/gaurd/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './layout/auth/auth.component';
import { DashboardModule } from './dashboard/dashboard.module';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: () => import('./auth/auth.module').then((module => module.AuthModule))
      }
    ]
  },
  {
    path:'dashboard',
    canActivate:[AuthGuard],
    loadChildren:() => import('./dashboard/dashboard.module').then((module => DashboardModule))
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
