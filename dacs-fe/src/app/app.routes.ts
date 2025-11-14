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
  // Clientes page (clients list)
  { path: 'clientes/new', loadComponent: () => import('./clientes/clientes-create-page').then(m => m.ClientesCreatePageComponent), data: { title: 'Nuevo cliente' } },
  { path: 'clientes', loadComponent: () => import('./clientes/clientes-page').then(m => m.ClientesPageComponent), data: { title: 'Clientes' } },
  // Placeholder for Turnos (will implement Turnos view later)
  { path: 'turnos', loadComponent: () => import('./options/option-page').then(m => m.OptionPageComponent), data: { title: 'Turnos' } },
  { path: 'usuarios', loadComponent: () => import('./options/option-page').then(m => m.OptionPageComponent), data: { title: 'Usuarios' } },
  { path: '**', redirectTo: '/home' }
];
