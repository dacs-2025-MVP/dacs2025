import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../core/services/api-service';

@Component({
  selector: 'app-usuarios-view-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './usuarios-view-page.html',
  styleUrls: ['./usuarios-view-page.css']
})
export class UsuariosViewPageComponent implements OnInit {
  usuario: any = null;
  loading = false;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Usuario no especificado';
      return;
    }
    this.loadUsuario(id);
  }

  loadUsuario(id: string): void {
    this.loading = true;
    this.api.getUsuarioById(id).subscribe({
      next: (resp) => {
        this.usuario = resp?.data || resp || null;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando usuario', err);
        this.error = err?.errorDescription || err?.message || 'Error al cargar usuario';
        this.loading = false;
      }
    });
  }

  backToList(): void {
    this.router.navigate(['/usuarios']);
  }
}
