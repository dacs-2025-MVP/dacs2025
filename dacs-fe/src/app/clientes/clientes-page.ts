import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
// not using FormsModule to avoid template errors; use native input events
import { ApiService } from '../core/services/api-service';

@Component({
  selector: 'app-clientes-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './clientes-page.html',
  styleUrls: ['./clientes-page.css']
})
export class ClientesPageComponent implements OnInit {
  title = 'Clientes';
  clientes: any[] = [];
  displayedClientes: any[] = [];
  searchTerm: string = '';
  loading = false;
  error: string | null = null;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.loading = true;
    this.error = null;
    this.api.getClientes().subscribe({
      next: (resp) => {
        if (resp && resp.data && Array.isArray(resp.data)) {
          this.clientes = resp.data;
        } else if (resp && resp.data) {
          this.clientes = Array.isArray(resp.data) ? resp.data : [resp.data];
        } else {
          this.clientes = Array.isArray(resp as any) ? (resp as any) : [];
        }
        // inicializamos la lista mostrada (para búsquedas locales)
        this.displayedClientes = [...this.clientes];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando clientes', err);
        this.loading = false;
        // If 404, treat as empty list without showing a confusing message.
        if (err && err.status === 404) {
          this.error = null;
        } else {
          this.error = err?.errorDescription || err?.message || 'Error al cargar clientes';
        }
        this.clientes = [];
        this.displayedClientes = [];
      }
    });
  }

  searchByName(): void {
    const q = (this.searchTerm || '').trim().toLowerCase();
    if (!q) {
      this.displayedClientes = [...this.clientes];
      return;
    }
    this.displayedClientes = this.clientes.filter(c => {
      const nombre = (c?.nombre || '').toString().toLowerCase();
      const apellido = (c?.apellido || '').toString().toLowerCase();
      return nombre.includes(q) || apellido.includes(q) || (`${nombre} ${apellido}`).includes(q);
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.displayedClientes = [...this.clientes];
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target ? (target.value || '') : '';
  }

  goToDetalle(cliente: any): void {
    if (cliente?.usuario_id) {
      this.router.navigate(['/clientes', cliente.usuario_id]);
    } else {
      this.router.navigate(['/clientes']);
    }
  }

  confirmDelete(cliente: any): void {
    if (!cliente?.usuario_id) return;
    const ok = window.confirm('¿Está seguro que desea eliminar este cliente?');
    if (!ok) {
      alert('Operación cancelada');
      return;
    }

    this.api.deleteCliente(cliente.usuario_id).subscribe({
      next: () => {
        alert('Eliminado correctamente');
        this.loadClientes();
      },
      error: (err) => {
        console.error('Error al eliminar', err);
        alert('Error al eliminar: ' + (err?.errorDescription || err?.message || 'Error desconocido'));
      }
    });
  }
}
