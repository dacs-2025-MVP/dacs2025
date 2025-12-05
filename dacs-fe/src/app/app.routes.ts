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
  { path: 'vehiculos/new', loadComponent: () => import('./vehiculos/vehiculos-create-page').then(m => m.VehiculosCreatePageComponent), data: { title: 'Nuevo vehículo' } },
  { path: 'vehiculos/view/:id', loadComponent: () => import('./vehiculos/vehiculos-view-page').then(m => m.VehiculosViewPageComponent), data: { title: 'Información del vehículo' } },
  { path: 'vehiculos/:id/reparaciones', loadComponent: () => import('./vehiculos/historial-reparaciones-page').then(m => m.HistorialReparacionesPageComponent), data: { title: 'Historial de reparaciones' } },
  { path: 'vehiculos/:id/reparaciones/new', loadComponent: () => import('./reparaciones/reparacion-create-page').then(m => m.ReparacionCreatePageComponent), data: { title: 'Nueva reparación' } },
  { path: 'vehiculos/:vehiculoId/reparaciones/:id', loadComponent: () => import('./reparaciones/reparacion-edit-page').then(m => m.ReparacionEditPageComponent), data: { title: 'Editar reparación' } },
  { path: 'vehiculos/:vehiculoId/reparaciones/:reparacionId/lineas/:lineaId/fotos', loadComponent: () => import('./reparaciones/reparacion-fotos-page').then(m => m.ReparacionFotosPageComponent), data: { title: 'Fotos de la línea' } },
  { path: 'vehiculos/:vehiculoId/reparaciones/:id/view', loadComponent: () => import('./reparaciones/reparacion-detail-page').then(m => m.ReparacionDetailPageComponent), data: { title: 'Ver reparación' } },
  { path: 'vehiculos/:id', loadComponent: () => import('./vehiculos/vehiculos-edit-page').then(m => m.VehiculosEditPageComponent), data: { title: 'Modificar vehículo' } },
  { path: 'vehiculos', loadComponent: () => import('./vehiculos/vehiculos-page').then(m => m.VehiculosPageComponent), data: { title: 'Vehículos' } },
  // Clientes page (clients list)
  { path: 'clientes/new', loadComponent: () => import('./clientes/clientes-create-page').then(m => m.ClientesCreatePageComponent), data: { title: 'Nuevo cliente' } },
  { path: 'clientes/new', loadComponent: () => import('./clientes/clientes-create-page').then(m => m.ClientesCreatePageComponent), data: { title: 'Nuevo cliente' } },
  { path: 'clientes/view/:id', loadComponent: () => import('./clientes/clientes-view-page').then(m => m.ClientesViewPageComponent), data: { title: 'Visualizar cliente' } },
  { path: 'clientes/:id', loadComponent: () => import('./clientes/clientes-edit-page').then(m => m.ClientesEditPageComponent), data: { title: 'Modificar cliente' } },
  { path: 'clientes', loadComponent: () => import('./clientes/clientes-page').then(m => m.ClientesPageComponent), data: { title: 'Clientes' } },
  // Placeholder for Turnos (will implement Turnos view later)
  { path: 'turnos', loadComponent: () => import('./options/option-page').then(m => m.OptionPageComponent), data: { title: 'Turnos' } },
  { path: 'usuarios/new', loadComponent: () => import('./usuarios/usuarios-create').then(m => m.UsuariosCreateComponent), data: { title: 'Crear usuario' } },
  { path: 'usuarios', loadComponent: () => import('./usuarios/usuarios-page').then(m => m.UsuariosPageComponent), data: { title: 'Usuarios' } },
  { path: '**', redirectTo: '/home' }
];
