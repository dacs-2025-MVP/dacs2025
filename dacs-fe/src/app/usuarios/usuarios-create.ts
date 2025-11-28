import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/services/api-service';

@Component({
  selector: 'app-usuarios-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios-create.html',
  styleUrls: ['./usuarios-create.css']
})
export class UsuariosCreateComponent implements OnInit {
  clientes: any[] = [];
  selectedClienteId: number | null = null;
  loading = false;
  creating = false;
  error: string | null = null;
  createdCredentials: { username: string; password: string } | null = null;

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadAvailableClientes();
  }

  loadAvailableClientes(): void {
    this.loading = true;
    this.api.getAvailableClientsForUser().subscribe({
      next: (resp) => {
        if (resp && resp.data && Array.isArray(resp.data)) {
          this.clientes = resp.data;
        } else if (resp && Array.isArray(resp)) {
          this.clientes = resp as any;
        } else {
          this.clientes = [];
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando clientes disponibles', err);
        this.loading = false;
        this.error = 'Error al cargar clientes disponibles';
        this.clientes = [];
      }
    });
  }

  createUser(): void {
    if (!this.selectedClienteId) {
      alert('Seleccione un cliente');
      return;
    }
    this.creating = true;
    this.error = null;
    this.createdCredentials = null;
    this.api.createUserForCliente({ clienteId: this.selectedClienteId }).subscribe({
      next: (resp) => {
        // Expect resp to contain the created usuario with username and password fields
        this.creating = false;
        const user = resp && resp.data ? resp.data : resp;
        this.createdCredentials = { username: user.username, password: user.password };
      },
      error: (err) => {
        console.error('Error creando usuario', err);
        this.creating = false;
        this.error = err?.errorDescription || err?.message || 'Error al crear usuario';
      }
    });
  }

  backToList(): void {
    this.router.navigate(['/usuarios']);
  }
}
