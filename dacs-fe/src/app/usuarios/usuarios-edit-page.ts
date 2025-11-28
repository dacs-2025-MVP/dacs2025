import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/services/api-service';

@Component({
    selector: 'app-usuarios-edit',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './usuarios-edit-page.html',
    styleUrls: ['./usuarios-edit-page.css']
})
export class UsuariosEditPageComponent implements OnInit {
    usuario: any = {
        nombre: '',
        apellido: '',
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
            this.loadUsuario(this.id);
        } else {
            alert('ID de usuario no proporcionado');
            this.router.navigate(['/usuarios']);
        }
    }

    loadUsuario(id: string): void {
        this.loading = true;
        this.api.getUsuarioById(id).subscribe({
            next: (resp) => {
                this.loading = false;
                const data = resp?.data || resp;
                if (data) {
                    this.usuario.nombre = data.nombre || '';
                    this.usuario.apellido = data.apellido || '';
                    this.usuario.num_telefono = data.num_telefono || data.telefono || '';
                    this.usuario.correo = data.correo || data.email || '';
                    this.usuario.dni = data.dni || data.documento || '';
                }
            },
            error: (err) => {
                this.loading = false;
                console.error('Error cargando usuario', err);
                alert('Error al cargar usuario: ' + (err?.errorDescription || err?.message || 'Error desconocido'));
                this.router.navigate(['/usuarios']);
            }
        });
    }

    guardar(): void {
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
            nombre: this.usuario.nombre,
            apellido: this.usuario.apellido,
            num_telefono: this.usuario.num_telefono,
            correo: this.usuario.correo,
            dni: this.usuario.dni
        };

        this.api.updateUsuario(this.id, payload).subscribe({
            next: () => {
                this.saving = false;
                alert('Usuario actualizado correctamente');
                this.router.navigate(['/usuarios']);
            },
            error: (err) => {
                this.saving = false;
                console.error('Error actualizando usuario', err);
                alert('Error al actualizar usuario: ' + (err?.errorDescription || err?.message || 'Error desconocido'));
            }
        });
    }

    cancelar(): void {
        this.router.navigate(['/usuarios']);
    }
}
