import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/services/api-service';

@Component({
  selector: 'app-vehiculos-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './vehiculos-edit-page.html',
  styleUrls: ['./vehiculos-edit-page.css']
})
export class VehiculosEditPageComponent implements OnInit {
  title = 'Modificar datos del vehículo';

  id: string | null = null;
  loading = false;
  saving = false;

  // vehicle fields (read-only except cliente)
  patente: string = '';
  marca: string = '';
  modelo: string = '';
  color: string = '';

  // client selector
  clienteId: number | null = null;
  clienteNameTerm: string = '';
  clientes: any[] = [];
  filteredClientes: any[] = [];

  showConfirm = false;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id) {
      alert('ID de vehículo no proporcionado');
      this.router.navigate(['/vehiculos']);
      return;
    }
    this.loadClientes();
    this.loadVehiculo(this.id);
  }

  loadClientes(): void {
    this.api.getClientes().subscribe({
      next: (resp) => {
        const arr = resp && resp.data ? (Array.isArray(resp.data) ? resp.data : [resp.data]) : [];
        this.clientes = arr;
        this.filteredClientes = [...this.clientes];
      },
      error: (err) => {
        console.error('Error cargando clientes', err);
        this.clientes = [];
        this.filteredClientes = [];
      }
    });
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
          this.clienteId = data.clienteId || data.cliente_id || null;
          // set clienteNameTerm if we have client list available
          const c = this.clientes.find(x => (x.usuario_id || x.id) === this.clienteId);
          if (c) this.clienteNameTerm = `${c?.nombre || ''} ${c?.apellido || ''}`.trim();
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Error cargando vehiculo', err);
        alert('Error al cargar vehículo: ' + (err?.errorDescription || err?.message || 'Error desconocido'));
        this.router.navigate(['/vehiculos']);
      }
    });
  }

  onClienteInput(): void {
    const q = (this.clienteNameTerm || '').trim().toLowerCase();
    if (!q) {
      this.filteredClientes = [...this.clientes];
      return;
    }
    this.filteredClientes = this.clientes.filter(c => {
      const nombre = (c?.nombre || '').toString().toLowerCase();
      const apellido = (c?.apellido || '').toString().toLowerCase();
      const full = `${nombre} ${apellido}`.trim();
      return nombre.includes(q) || apellido.includes(q) || full.includes(q);
    });
  }

  selectCliente(c: any): void {
    this.clienteId = c?.usuario_id || c?.id || null;
    this.clienteNameTerm = `${c?.nombre || ''} ${c?.apellido || ''}`.trim();
    this.filteredClientes = [];
  }

  cancel(): void {
    this.router.navigate(['/vehiculos']);
  }

  save(): void {
    if (!this.id) return;
    if (!this.clienteId) {
      alert('Seleccione un cliente válido antes de guardar.');
      return;
    }
    this.showConfirm = true;
  }

  confirmSave(): void {
    if (!this.id) return;
    this.showConfirm = false;
    this.saving = true;
    const payload = {
      clienteId: this.clienteId
    };
    this.api.updateVehiculo(this.id, payload).subscribe({
      next: () => {
        this.saving = false;
        alert('Vehículo actualizado correctamente');
        this.router.navigate(['/vehiculos']);
      },
      error: (err) => {
        this.saving = false;
        console.error('Error actualizando vehículo', err);
        alert('Error al actualizar vehículo: ' + (err?.errorDescription || err?.message || 'Error desconocido'));
      }
    });
  }

  closeConfirm(): void {
    this.showConfirm = false;
  }
}
