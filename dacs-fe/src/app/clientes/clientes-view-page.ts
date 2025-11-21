import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../core/services/api-service';

@Component({
  selector: 'app-clientes-view-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './clientes-view-page.html',
  styleUrls: ['./clientes-view-page.css']
})
export class ClientesViewPageComponent implements OnInit {
  cliente: any = null;
  loading = false;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Cliente no especificado';
      return;
    }
    this.loadCliente(id);
  }

  loadCliente(id: string): void {
    this.loading = true;
    this.api.getClienteById(id).subscribe({
      next: (resp) => {
        // API responses in the app usually wrap data inside `data`
        this.cliente = resp?.data || resp || null;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando cliente', err);
        this.error = err?.errorDescription || err?.message || 'Error al cargar cliente';
        this.loading = false;
      }
    });
  }

  backToList(): void {
    this.router.navigate(['/clientes']);
  }
}
