import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'tools/tool1',
    loadComponent: () => import('./tools/tool1/tool1.component').then(m => m.Tool1Component),
  },
  {
    path: 'tools/tool2',
    loadComponent: () => import('./tools/tool2/tool2.component').then(m => m.Tool2Component),
  },
  {
    path: 'tools/tool3',
    loadComponent: () => import('./tools/tool3/tool3.component').then(m => m.Tool3Component),
  },
  {
    path: 'tools/tool4',
    loadComponent: () => import('./tools/tool4/tool4.component').then(m => m.Tool4Component),
  },
  {
    path: 'tools/tool5',
    loadComponent: () => import('./tools/tool5/tool5.component').then(m => m.Tool5Component),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'employee-list',
    loadComponent: () => import('./tools/employee-list/employee-list.component').then(m => m.EmployeeListComponent),
  },
  {
    path: 'tools/powerbi-reports-list',
    loadComponent: () => import('./tools/powerbi-reports-list/component.report').then(m => m.PowerBIReportsListComponent),

  }
  

];
