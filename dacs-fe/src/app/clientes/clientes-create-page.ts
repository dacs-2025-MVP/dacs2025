import { Component } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { finalize, timeout, catchError } from 'rxjs/operators';
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
  private verifySub: Subscription | null = null;

  constructor(private api: ApiService, private router: Router) { }

  verificar(): void {
    if (this.isVerifying) {
      // already verifying, ignore duplicate requests
      return;
    }

    const dni = this.cliente.dni;
    if (!dni) {
      alert('Ingrese un documento para verificar');
      return;
    }

    this.isVerifying = true;
    this.verifyError = null;

    // cancel previous verify if any
    if (this.verifySub) {
      this.verifySub.unsubscribe();
      this.verifySub = null;
    }

    this.verifySub = this.api.verifyDni(dni).pipe(
      timeout(10000), // fail fast after 10s
      catchError((err) => {
        console.error('Error verificando DNI (pipe)', err);
        this.verifyError = err?.errorDescription || err?.message || 'Error al verificar DNI';
        return of(null);
      }),
      finalize(() => {
        this.isVerifying = false;
        this.verifySub = null;
      })
    ).subscribe((resp) => {
      if (!resp) return;
      const fullName = resp?.data?.fullName || resp?.fullName || resp?.full_name || '';
      if (fullName) {
        this.cliente.nombre = fullName;
      } else {
        this.verifyError = 'No se encontró nombre para el DNI proporcionado';
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
