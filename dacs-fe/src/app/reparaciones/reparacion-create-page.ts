import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/services/api-service';

@Component({
  selector: 'app-reparacion-create',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './reparacion-create-page.html',
  styleUrls: ['./reparacion-create-page.css']
})
export class ReparacionCreatePageComponent implements OnInit {
  vehicleId: number | null = null;
  fechaIngreso: string = '';
  fechaEgreso: string = '';
  responsable: string = '';

  presupuestoFiles: File[] = [];
  repuestosFiles: File[] = [];

  // lineas de reparacion: each has fecha, responsable, detalle, imagen (optional)
  lineas: Array<any> = [];

  saving = false;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.vehicleId = id ? Number(id) : null;
  }

  onPresupuestoFilesChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (!input.files) return;
    for (let i = 0; i < input.files.length; i++) {
      this.presupuestoFiles.push(input.files[i]);
    }
    input.value = '';
  }

  onRepuestosFilesChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (!input.files) return;
    for (let i = 0; i < input.files.length; i++) {
      this.repuestosFiles.push(input.files[i]);
    }
    input.value = '';
  }

  removePresupuesto(idx: number): void { this.presupuestoFiles.splice(idx, 1); }
  removeRepuesto(idx: number): void { this.repuestosFiles.splice(idx, 1); }

  addLinea(): void {
    const today = new Date().toISOString().split('T')[0];
    this.lineas.push({ fecha: today, detalle: '', imagen: null, editing: true });
  }

  editLinea(i: number): void { this.lineas[i].editing = true; }
  saveLinea(i: number): void { this.lineas[i].editing = false; }
  deleteLinea(i: number): void { this.lineas.splice(i,1); }

  uploadFiles(reparacionId: number): void {
    if (!this.vehicleId) return;
    // upload presupuestos
    this.presupuestoFiles.forEach(f => {
      this.api.uploadReparacionFile(this.vehicleId!, reparacionId, f, 'presupuesto').subscribe({
        next: () => {}, error: (e) => console.error('Error upload presupuesto', e)
      });
    });
    // upload repuestos
    this.repuestosFiles.forEach(f => {
      this.api.uploadReparacionFile(this.vehicleId!, reparacionId, f, 'repuesto').subscribe({
        next: () => {}, error: (e) => console.error('Error upload repuesto', e)
      });
    });
  }

  save(): void {
    if (!this.vehicleId) { alert('ID de vehículo inválido'); return; }
    this.saving = true;
    const payload = {
      fecha_ingreso: this.fechaIngreso || null,
      fecha_egreso: this.fechaEgreso || null,
      responsable: this.responsable || null
    };
    this.api.createReparacion(this.vehicleId, payload).subscribe({
      next: (resp) => {
        const reparacionId = resp && resp.data ? resp.data.reparacion_id || resp.data.id : resp?.reparacion_id || resp?.id;
        // upload files
        if (reparacionId) {
          this.uploadFiles(reparacionId);
          // create lineas (use backend field names)
          this.lineas.forEach(l => {
            const lp = { fecha: l.fecha, descripcion: l.detalle || l.descripcion || null };
            this.api.addLineaReparacion(reparacionId, lp).subscribe({ next: () => {}, error: (e) => console.error('Error creando linea', e) });
          });
        }
        this.saving = false;
        alert('Reparación creada correctamente');
        this.router.navigate([`/vehiculos/${this.vehicleId}/reparaciones`]);
      },
      error: (err) => {
        console.error('Error creando reparacion', err);
        this.saving = false;
        alert('Error al crear reparación');
      }
    });
  }

  cancel(): void { if (this.vehicleId) this.router.navigate([`/vehiculos/${this.vehicleId}/reparaciones`]); else this.router.navigate(['/vehiculos']); }
}
