import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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
      }
    });
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
