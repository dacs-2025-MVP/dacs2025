import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ApiService } from '../core/services/api-service';

@Component({
  selector: 'app-vehiculos-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vehiculos-view-page.html',
  styleUrls: ['./vehiculos-view-page.css']
})
export class VehiculosViewPageComponent implements OnInit {
  title = 'Información del vehículo';

  id: string | null = null;
  loading = false;
  error: string | null = null;

  patente = '';
  marca = '';
  modelo = '';
  color = '';
  clienteName = '';

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id) {
      alert('ID de vehículo no proporcionado');
      this.router.navigate(['/vehiculos']);
      return;
    }
    this.loadVehiculo(this.id);
  }

  loadVehiculo(id: string): void {
    this.loading = true;
    this.api.getVehiculoById(id).subscribe({
      next: (resp) => {
        this.loading = false;
        const data = resp?.data || resp;
        if (data) {
          this.patente = data.patente || data.patente_vehiculo || '';
          this.marca = data.marca || '';
          this.modelo = data.modelo || '';
          this.color = data.color || '';
          const clienteId = data.clienteId || data.cliente_id || null;
          if (clienteId) {
            this.api.getClienteById(clienteId).subscribe({
              next: (cr) => {
                const cd = cr?.data || cr;
                this.clienteName = cd ? `${cd.nombre || ''} ${cd.apellido || ''}`.trim() : '';
              },
              error: () => {
                this.clienteName = '';
              }
            });
          }
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Error cargando vehículo', err);
        this.error = err?.errorDescription || err?.message || 'Error al cargar vehículo';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/vehiculos']);
  }
}
