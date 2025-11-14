import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/services/api-service';

@Component({
  selector: 'app-clientes-create',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './clientes-create-page.html',
  styleUrls: ['./clientes-create-page.css']
})
export class ClientesCreatePageComponent {
  cliente: any = {
    nombre: '',
    num_telefono: '',
    correo: '',
    dni: ''
  };

  saving = false;

  constructor(private api: ApiService, private router: Router) {}

  cancelar(): void {
    this.router.navigate(['/home']);
  }

  guardar(): void {
    this.saving = true;
    const payload = {
      nombre: this.cliente.nombre,
      num_telefono: this.cliente.num_telefono,
      correo: this.cliente.correo,
      dni: this.cliente.dni
    };

    this.api.createCliente(payload).subscribe({
      next: () => {
        this.saving = false;
        alert('Cliente creado correctamente');
        this.router.navigate(['/clientes']);
      },
      error: (err) => {
        this.saving = false;
        console.error('Error creando cliente', err);
        alert('Error al crear cliente: ' + (err?.message || 'Error desconocido'));
      }
    });
  }
}
