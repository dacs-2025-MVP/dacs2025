import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/services/api-service';

@Component({
  selector: 'app-vehiculos-create',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './vehiculos-create-page.html',
  styleUrls: ['./vehiculos-create-page.css']
})
export class VehiculosCreatePageComponent implements OnInit {
  title = 'Nuevo vehículo';

  // form model
  clienteId: number | null = null;
  clienteNameTerm: string = '';
  patente: string = '';
  marca: string = '';
  modelo: string = '';
  color: string = '';

  // clients data for dropdown/search
  clientes: any[] = [];
  filteredClientes: any[] = [];
  loading = false;
  saving = false;
  showConfirm = false;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadAllClientes();
  }

  loadAllClientes(): void {
    this.loading = true;
    this.api.getClientes().subscribe({
      next: (resp) => {
        const arr = resp && resp.data ? (Array.isArray(resp.data) ? resp.data : [resp.data]) : [];
        this.clientes = arr;
        this.filteredClientes = [...this.clientes];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando clientes', err);
        this.loading = false;
        this.clientes = [];
        this.filteredClientes = [];
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

  // patente uppercase and basic formatting enforcement
  onPatenteInput(e: Event): void {
    const t = (e.target as HTMLInputElement).value || '';
    this.patente = t.toUpperCase();
  }

  patenteValida(): boolean {
    const p = (this.patente || '').toUpperCase();
    const re = /^([A-Z]{2}-\d{3}-[A-Z]{2}|[A-Z]{3}-\d{3})$/;
    return re.test(p);
  }

  canSave(): boolean {
    return !!this.clienteId && !!this.patente && this.patenteValida() && !!this.marca && !!this.modelo && !!this.color && !this.saving;
  }

  cancel(): void {
    this.router.navigate(['/vehiculos']);
  }

  save(): void {
    if (!this.canSave()) {
      alert('Complete todos los campos requeridos con datos válidos antes de guardar.');
      return;
    }
    this.showConfirm = true;
  }

  confirmSave(): void {
    this.showConfirm = false;
    if (!this.canSave()) return;
    this.saving = true;
    const payload = {
      clienteId: this.clienteId,
      patente: this.patente,
      marca: this.marca,
      modelo: this.modelo,
      color: this.color
    };
    this.api.createVehiculo(payload).subscribe({
      next: () => {
        this.saving = false;
        alert('Vehículo creado correctamente');
        this.router.navigate(['/vehiculos']);
      },
      error: (err) => {
        this.saving = false;
        console.error('Error creando vehículo', err);
        alert('Error al crear vehículo: ' + (err?.errorDescription || err?.message || 'Error desconocido'));
      }
    });
  }

  closeConfirm(): void {
    this.showConfirm = false;
  }
}
