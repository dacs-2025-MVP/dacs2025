import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../core/services/api-service';

@Component({
  selector: 'app-usuarios-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
    this.api.getUsuarios().subscribe({
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
    this.displayedUsuarios = this.usuarios.filter(u => {
      const nombre = (u?.nombre || '').toString().toLowerCase();
      const apellido = (u?.apellido || '').toString().toLowerCase();
      return nombre.includes(q) || apellido.includes(q) || (`${nombre} ${apellido}`).includes(q);
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

  goToDetalle(usuario: any): void {
    if (usuario?.usuario_id) {
      this.router.navigate(['/usuarios', 'view', usuario.usuario_id]);
    } else {
      this.router.navigate(['/usuarios']);
    }
  }

  goToEdit(usuario: any): void {
    if (usuario?.usuario_id) {
      this.router.navigate(['/usuarios', usuario.usuario_id]);
    } else {
      this.router.navigate(['/usuarios']);
    }
  }

  confirmDelete(usuario: any): void {
    if (!usuario?.usuario_id) return;
    const ok = window.confirm('¿Está seguro que desea eliminar este usuario?');
    if (!ok) {
      alert('Operación cancelada');
      return;
    }

    this.api.deleteUsuario(usuario.usuario_id).subscribe({
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
