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
  isVerifying = false;
  verifyError: string | null = null;

  constructor(private api: ApiService, private router: Router) {}

  verificar(): void {
    const dni = this.cliente.dni;
    if (!dni) {
      alert('Ingrese un documento para verificar');
      return;
    }
    this.isVerifying = true;
    this.verifyError = null;

    this.api.verifyDni(dni).subscribe({
      next: (resp) => {
        this.isVerifying = false;
        const fullName = resp?.data?.fullName || resp?.fullName || resp?.full_name || '';
        if (fullName) {
          this.cliente.nombre = fullName;
        } else {
          this.verifyError = 'No se encontró nombre para el DNI proporcionado';
        }
      },
      error: (err) => {
        this.isVerifying = false;
        console.error('Error verificando DNI', err);
        // show friendly message if we have structured error
        this.verifyError = err?.errorDescription || err?.message || 'Error al verificar DNI';
      }
    });
  }

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
