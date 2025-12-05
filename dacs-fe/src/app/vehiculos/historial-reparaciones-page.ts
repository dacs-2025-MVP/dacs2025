import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ApiService } from '../core/services/api-service';

@Component({
  selector: 'app-historial-reparaciones-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './historial-reparaciones-page.html',
  styleUrls: ['./historial-reparaciones-page.css']
})
export class HistorialReparacionesPageComponent implements OnInit {
  title = 'Historial de reparaciones de un vehículo';
  vehiculoId: string | number | null = null;
  reparaciones: any[] = [];
  displayedReparaciones: any[] = [];
  searchTerm: string = '';
  loading = false;
  error: string | null = null;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.vehiculoId = id;
    if (id) this.loadReparaciones(id);
  }

  loadReparaciones(id: string | number): void {
    this.loading = true;
    this.error = null;
    this.api.getReparacionesByVehiculo(id).subscribe({
      next: (resp) => {
        let arr: any[] = [];
        if (resp && resp.data) arr = Array.isArray(resp.data) ? resp.data : [resp.data];
        else arr = Array.isArray(resp as any) ? (resp as any) : [];
        this.reparaciones = arr;
        this.displayedReparaciones = [...this.reparaciones];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando reparaciones', err);
        this.loading = false;
        this.error = err?.errorDescription || err?.message || 'Error al cargar reparaciones';
      }
    });
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target ? (target.value || '') : '';
  }

  searchByTerm(): void {
    const q = (this.searchTerm || '').trim().toLowerCase();
    if (!q) {
      this.displayedReparaciones = [...this.reparaciones];
      return;
    }
    this.displayedReparaciones = this.reparaciones.filter(r => ((r?.responsable || '') as string).toLowerCase().includes(q));
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.displayedReparaciones = [...this.reparaciones];
  }

  goToEdit(reparacion: any): void {
    if (!this.vehiculoId) return;
    const rid = reparacion?.reparacion_id || reparacion?.id || reparacion?.reparacionId;
    if (!rid) return;
    this.router.navigate([`/vehiculos/${this.vehiculoId}/reparaciones/${rid}`]);
  }

  goToDetalle(reparacion: any): void {
    if (!this.vehiculoId) return;
    const rid = reparacion?.reparacion_id || reparacion?.id || reparacion?.reparacionId;
    if (!rid) return;
    this.router.navigate([`/vehiculos/${this.vehiculoId}/reparaciones/${rid}/view`]);
  }

  crearNueva(): void {
    if (!this.vehiculoId) return;
    this.router.navigate([`/vehiculos/${this.vehiculoId}/reparaciones/new`]);
  }

  cancelar(): void {
    this.router.navigate(['/vehiculos']);
  }
}
