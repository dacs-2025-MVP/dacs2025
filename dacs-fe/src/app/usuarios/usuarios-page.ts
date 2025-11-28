import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/services/api-service';

@Component({
  selector: 'app-usuarios-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './usuarios-page.html',
  styleUrls: ['./usuarios-page.css']
})
export class UsuariosPageComponent implements OnInit {
  title = 'Usuarios';
  usuarios: any[] = [];
  displayedUsuarios: any[] = [];
  searchTerm: string = '';
  loading = false;
  error: string | null = null;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.loading = true;
    this.error = null;
    this.api.getAppUsers().subscribe({
      next: (resp) => {
        if (resp && resp.data && Array.isArray(resp.data)) {
          this.usuarios = resp.data;
        } else if (resp && resp.data) {
          this.usuarios = Array.isArray(resp.data) ? resp.data : [resp.data];
        } else {
          this.usuarios = Array.isArray(resp as any) ? (resp as any) : [];
        }
        this.displayedUsuarios = [...this.usuarios];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando usuarios', err);
        this.loading = false;
        if (err && err.status === 404) {
          this.error = null;
        } else {
          this.error = err?.errorDescription || err?.message || 'Error al cargar usuarios';
        }
        this.usuarios = [];
        this.displayedUsuarios = [];
      }
    });
  }

  searchByName(): void {
    const q = (this.searchTerm || '').trim().toLowerCase();
    if (!q) {
      this.displayedUsuarios = [...this.usuarios];
      return;
    }
    this.displayedUsuarios = this.usuarios.filter(c => {
      const nombre = (c?.nombre || '').toString().toLowerCase();
      const apellido = (c?.apellido || '').toString().toLowerCase();
      const username = (c?.username || '').toString().toLowerCase();
      return nombre.includes(q) || apellido.includes(q) || username.includes(q) || (`${nombre} ${apellido}`).includes(q);
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.displayedUsuarios = [...this.usuarios];
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target ? (target.value || '') : '';
  }

  goToCreate(): void {
    this.router.navigate(['/usuarios', 'new']);
  }

  goToDetalle(usuario: any): void {
    if (usuario?.usuario_id) {
      this.router.navigate(['/clientes', 'view', usuario.usuario_id]);
    } else {
      this.router.navigate(['/clientes']);
    }
  }

  goToEdit(usuario: any): void {
    if (usuario?.usuario_id) {
      this.router.navigate(['/clientes', usuario.usuario_id]);
    } else {
      this.router.navigate(['/clientes']);
    }
  }

  confirmDelete(usuario: any): void {
    if (!usuario?.usuario_id) return;
    const ok = window.confirm('¿Está seguro que desea eliminar este usuario (cliente)?');
    if (!ok) return;
    // Deleting a user here deletes the client record - keep behavior consistent with clientes
    this.api.deleteCliente(usuario.usuario_id).subscribe({
      next: () => {
        alert('Eliminado correctamente');
        this.loadUsuarios();
      },
      error: (err) => {
        console.error('Error al eliminar', err);
        alert('Error al eliminar: ' + (err?.errorDescription || err?.message || 'Error desconocido'));
      }
    });
  }
}
