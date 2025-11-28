import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/services/api-service';

@Component({
  selector: 'app-usuarios-create',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './usuarios-create-page.html',
  styleUrls: ['./usuarios-create-page.css']
})
export class UsuariosCreatePageComponent {
  usuario: any = {
    nombre: '',
    apellido: '',
    num_telefono: '',
    correo: '',
    dni: ''
  };

  saving = false;

  constructor(private api: ApiService, private router: Router) { }

  cancelar(): void {
    this.router.navigate(['/usuarios']);
  }

  guardar(): void {
    this.saving = true;
    const payload = {
      nombre: this.usuario.nombre,
      apellido: this.usuario.apellido,
      num_telefono: this.usuario.num_telefono,
      correo: this.usuario.correo,
      dni: this.usuario.dni
    };

    this.api.createUsuario(payload).subscribe({
      next: () => {
        this.saving = false;
        alert('Usuario creado correctamente');
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        this.saving = false;
        console.error('Error creando usuario', err);
        alert('Error al crear usuario: ' + (err?.message || 'Error desconocido'));
      }
    });
  }
}
