import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/services/api-service';

@Component({
    selector: 'app-clientes-edit',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './clientes-edit-page.html',
    styleUrls: ['./clientes-edit-page.css']
})
export class ClientesEditPageComponent implements OnInit {
    cliente: any = {
        nombre: '',
        num_telefono: '',
        correo: '',
        dni: ''
    };

    loading = false;
    saving = false;
    id: string | null = null;
    showConfirm = false;

    constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id) {
            this.loadCliente(this.id);
        } else {
            alert('ID de cliente no proporcionado');
            this.router.navigate(['/clientes']);
        }
    }

    loadCliente(id: string): void {
        this.loading = true;
        this.api.getClienteById(id).subscribe({
            next: (resp) => {
                this.loading = false;
                const data = resp?.data || resp;
                if (data) {
                    // map fields to local model (tolerant)
                    this.cliente.nombre = data.nombre || (data.nombre + ' ' + (data.apellido || '')) || '';
                    this.cliente.num_telefono = data.num_telefono || data.telefono || '';
                    this.cliente.correo = data.correo || data.email || data.email_address || '';
                    this.cliente.dni = data.dni || data.documento || '';
                }
            },
            error: (err) => {
                this.loading = false;
                console.error('Error cargando cliente', err);
                alert('Error al cargar cliente: ' + (err?.errorDescription || err?.message || 'Error desconocido'));
                this.router.navigate(['/clientes']);
            }
        });
    }

    guardar(): void {
        // Open confirmation modal before saving
        if (!this.id) return;
        this.showConfirm = true;
    }

    confirmSave(): void {
        this.showConfirm = false;
        this.doSave();
    }

    closeConfirm(): void {
        this.showConfirm = false;
    }

    private doSave(): void {
        if (!this.id) return;
        this.saving = true;
        const payload = {
            nombre: this.cliente.nombre,
            num_telefono: this.cliente.num_telefono,
            correo: this.cliente.correo,
            dni: this.cliente.dni
        };

        this.api.updateCliente(this.id, payload).subscribe({
            next: () => {
                this.saving = false;
                alert('Cliente actualizado correctamente');
                this.router.navigate(['/clientes']);
            },
            error: (err) => {
                this.saving = false;
                console.error('Error actualizando cliente', err);
                alert('Error al actualizar cliente: ' + (err?.errorDescription || err?.message || 'Error desconocido'));
            }
        });
    }

    cancelar(): void {
        this.router.navigate(['/clientes']);
    }
}
