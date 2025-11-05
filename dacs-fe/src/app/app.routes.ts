import { Routes } from '@angular/router';
import { RoleAGuard } from './core/guards/role.guard';
import { RoleBGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home').then(m => m.HomeComponent) },
  { 
    path: 'table-grid', 
    loadComponent: () => import('./table-grid/table-grid').then(m => m.TableGridComponent),
    canActivate: [RoleAGuard]
  },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./dashboard-view/dashboard-view').then(m => m.DashboardViewComponent),
    canActivate: [RoleBGuard]
  },
  { path: 'vehiculos', loadComponent: () => import('./options/option-page').then(m => m.OptionPageComponent), data: { title: 'Vehículos' } },
  { path: 'clientes', loadComponent: () => import('./options/option-page').then(m => m.OptionPageComponent), data: { title: 'Clientes' } },
  { path: 'turnos', loadComponent: () => import('./options/option-page').then(m => m.OptionPageComponent), data: { title: 'Turnos' } },
  { path: 'usuarios', loadComponent: () => import('./options/option-page').then(m => m.OptionPageComponent), data: { title: 'Usuarios' } },
  { path: '**', redirectTo: '/home' }
];
