import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/services/api-service';

@Component({
  selector: 'app-reparacion-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './reparacion-edit-page.html',
  styleUrls: ['./reparacion-edit-page.css']
})
export class ReparacionEditPageComponent implements OnInit {
  vehiculoId: number | null = null;
  reparacionId: number | null = null;
  reparacion: any = null;
  originalReparacion: any = null;
  
  // State for line editing
  isEditingLine = false;
  isAddingLine = false;
  currentLineDate: string = '';
  currentLineDetail: string = '';
  editingLineId: number | null = null;
  
  // State for date editing
  editingDate: 'ingreso' | 'egreso' | null = null;

  loading = false;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const vid = this.route.snapshot.paramMap.get('vehiculoId');
    const rid = this.route.snapshot.paramMap.get('id');
    this.vehiculoId = vid ? Number(vid) : null;
    this.reparacionId = rid ? Number(rid) : null;
    if (this.reparacionId) this.loadReparacion(this.reparacionId);
  }

  loadReparacion(id: number): void {
    this.loading = true;
    this.api.getReparacionById(id).subscribe({
      next: (resp) => {
        this.reparacion = resp?.data || resp;
        
        // Map snake_case to camelCase for the form if needed
        this.reparacion.fechaIngreso = this.formatDate(this.reparacion.fecha_ingreso || this.reparacion.fechaIngreso);
        this.reparacion.fechaEgreso = this.formatDate(this.reparacion.fecha_egreso || this.reparacion.fechaEgreso);
        
        // Ensure lineasReparacion is populated
        if (!this.reparacion.lineasReparacion && this.reparacion.lineas) {
          this.reparacion.lineasReparacion = this.reparacion.lineas;
        }
        
        if (this.reparacion.lineasReparacion) {
          this.reparacion.lineasReparacion.forEach((l: any) => {
            l.fecha = this.formatDate(l.fecha);
          });
        }
        
        // Clone for comparison
        this.originalReparacion = JSON.parse(JSON.stringify(this.reparacion));
        
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  // Helper to format date string to 'yyyy-MM-dd'
  private formatDate(date: any): string {
    if (!date) return '';
    try {
      const d = new Date(date);
      // Adjust for timezone offset
      d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
      return d.toISOString().split('T')[0];
    } catch (e) {
      return '';
    }
  }

  saveReparacion(): void {
    if (!this.reparacionId || !this.reparacion) return;
    const payload: any = {
      fecha_ingreso: this.reparacion.fechaIngreso || null,
      fecha_egreso: this.reparacion.fechaEgreso || null,
      responsable: this.reparacion.responsable || null,
      reparacion_id: this.reparacionId,
      vehiculoId: this.reparacion.vehiculoId
    };
    
    this.api.updateReparacion(this.reparacionId, payload).subscribe({ 
      next: () => {
        alert('Reparación actualizada');
        this.back();
      }, 
      error: (e) => { console.error(e); alert('Error al actualizar la reparación'); } 
    });
  }

  toggleDateEdit(field: 'ingreso' | 'egreso'): void {
    this.editingDate = field;
  }

  // Line Editing Methods

  startAddLine(): void {
    this.isAddingLine = true;
    this.isEditingLine = false;
    this.currentLineDate = new Date().toISOString().split('T')[0];
    this.currentLineDetail = '';
    this.editingLineId = null;
  }

  editLinea(linea: any): void {
    this.isEditingLine = true;
    this.isAddingLine = false;
    this.currentLineDate = this.formatDate(linea.fecha);
    this.currentLineDetail = linea.descripcion || linea.detalle;
    this.editingLineId = linea.linea_reparacion_id || linea.id;
  }

  cancelLineEdit(): void {
    this.isAddingLine = false;
    this.isEditingLine = false;
    this.currentLineDate = '';
    this.currentLineDetail = '';
    this.editingLineId = null;
  }

  saveCurrentLine(): void {
    if (!this.reparacionId) return;

    const payload = {
      fecha: this.currentLineDate,
      descripcion: this.currentLineDetail,
      reparacionId: this.reparacionId
    };

    if (this.isAddingLine) {
      this.api.addLineaReparacion(this.reparacionId, payload).subscribe({
        next: () => {
          alert('Línea agregada');
          this.loadReparacion(this.reparacionId!); // Reload to refresh list
          this.cancelLineEdit();
        },
        error: (e) => { console.error(e); alert('Error al agregar línea'); }
      });
    } else if (this.isEditingLine && this.editingLineId) {
      this.api.updateLineaReparacion(this.editingLineId, payload).subscribe({
        next: () => {
          alert('Línea actualizada');
          this.loadReparacion(this.reparacionId!); // Reload to refresh list
          this.cancelLineEdit();
        },
        error: (e) => { console.error(e); alert('Error al actualizar línea'); }
      });
    }
  }

  deleteLinea(lineaId: number, index: number): void {
    if (!lineaId) return;
    if (confirm('¿Está seguro de que desea eliminar esta línea?')) {
      this.api.deleteLineaReparacion(lineaId).subscribe({ 
        next: () => {
          // Remove from local list to avoid reload if possible, or just reload
          if (this.reparacion.lineasReparacion) {
            this.reparacion.lineasReparacion.splice(index, 1);
          } else if (this.reparacion.lineas) {
             this.reparacion.lineas.splice(index, 1);
          }
        },
        error: (e) => { console.error(e); alert('Error al eliminar línea'); }
      });
    }
  }

  back(): void { 
    if (this.vehiculoId) {
      this.router.navigate([`/vehiculos/${this.vehiculoId}/reparaciones`]);
    } else {
      this.router.navigate(['/reparaciones']);
    }
  }
}
